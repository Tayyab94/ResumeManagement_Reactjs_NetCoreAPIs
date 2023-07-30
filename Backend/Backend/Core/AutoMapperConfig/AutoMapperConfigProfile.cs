using AutoMapper;
using Backend.Core.Dtos.Candidate;
using Backend.Core.Dtos.Company;
using Backend.Core.Dtos.Job;
using Backend.Core.Entities;

namespace Backend.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile :Profile
    {
        public AutoMapperConfigProfile()
        {
            //Company
            CreateMap<CompanyCreateDto, Company>();
            CreateMap<Company,CompanyGetDto>();

            //Job
            CreateMap<JobCreateDto,Job>();
            CreateMap<Job, JobGetDto>()
                .ForMember(des => des.CompanyName, op => op.MapFrom(src => src.Company.Name));

            //Candidate
            CreateMap<CandidateCreateDto, Candidate>().ForMember(s=>s.PhoneNumber, op=> op.MapFrom(sr=>sr.Phone));
            CreateMap<Candidate,CandidateGetDto>()
                .ForMember(des=> des.JobTitle, opt=> opt.MapFrom(src=>src.Job.Title)).ForMember(s=>s.Phone, op=>op.MapFrom(sr=>sr.PhoneNumber));

           

        }
    }
}
