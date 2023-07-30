using Backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Core.Context
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
            
        }


        public DbSet<Company> Companies { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Candidate> Candidates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Job>()
                .HasOne(s => s.Company)
                .WithMany(company => company.Jobs)
                .HasForeignKey(company => company.CompanyId);

            modelBuilder.Entity<Candidate>()
                .HasOne(candidate=>candidate.Job)
                .WithMany(job=>job.Candidates)
                .HasForeignKey(candidate => candidate.JobId);

            modelBuilder.Entity<Job>()
                .Property(job => job.Level)
                .HasConversion<string>();


            modelBuilder.Entity<Company>()
                .Property(company => company.Size)
                .HasConversion<string>();
        }
    }
}
