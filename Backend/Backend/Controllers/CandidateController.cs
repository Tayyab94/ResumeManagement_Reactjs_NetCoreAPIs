using AutoMapper;
using Backend.Core.Context;
using Backend.Core.Dtos.Candidate;
using Backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper;

        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        //Create
        [HttpPost]
        [Route("Create")]
        public async
            Task<IActionResult> CreateCandidate([FromForm]CandidateCreateDto candidateCreateDto,IFormFile pdfFile)
        {
            //First Save Pdf to server
            // then Save URl into Our Entity

            // Then => save url into our entity
            var fiveMegaByte = 5 * 1024 * 1024;
            var pdfMimeType = "application/pdf";

            if(pdfFile.Length>fiveMegaByte|| pdfFile.ContentType!=pdfMimeType)
            {
                return BadRequest("File is Not valid");
            }

            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
            var filePath= Path.Combine(Directory.GetCurrentDirectory(),"documents","pdfs",resumeUrl);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            try
            {
                var newCandidate = _mapper.Map<Candidate>(candidateCreateDto);
                newCandidate.ResumeUrl = resumeUrl;
                //newCandidate.JobId= long.Parse(candidateCreateDto.JobId);
                await _context.Candidates.AddAsync(newCandidate);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

            }
        

            return Ok("Candidate Saved Successfully");
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>>GetCandidate()
        {
            var data = await _context.Candidates.Include(s => s.Job)
                .OrderByDescending(s => s.CreatedAt).ToListAsync();
            var candidateList= _mapper.Map<IEnumerable<CandidateGetDto>>(data);
            return Ok(candidateList);
        }

        [HttpGet]
        [Route("GetRepeat")]
        public async Task<ActionResult> SameMethod()
        {
            var data = await _context.Candidates.Include(s => s.Job)
                .OrderByDescending(s => s.CreatedAt).ToListAsync();
            var candidateList = _mapper.Map<IEnumerable<CandidateGetDto>>(data);
            return Ok(candidateList);
        }

        //Read (Download Pdf)

        [HttpGet]
        [Route("download/{url}")]
        public async Task<IActionResult> DownloadPdf(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);

            if(!System.IO.File.Exists(filePath))
            {
                return BadRequest("File Not Found");
            }

            var pdfBytes= System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }
    }
}
