export interface ICompany{
    "id": string;
    "name": string;
    "size": string;
    "createdAt": string;
}

export interface ICreateCompanyDto{
    
    "name": string;
    "size": string;
}

export interface IJobs{
    
        "id": string;
        "title": string;
        "level": string;
        "companyId":string;
        "companyName": string;
        "createdAt": string;
     
}

export interface ICreateJobsDto{
    "title": string;
    "level": string;
    "companyId":string;
 
}


export interface ICandidate {
    "id":string;
    "firstName": string;
    "lastName": string;
    "email":string;
    "phone": string;
    "coverLetter": string;
    "resumeUrl": string;
    "jobId": bigint;
    "jobTitle": string;
  }

  
export interface ICreateCandidatedto {

    "firstName": string;
    "lastName": string;
    "email":string;
    "phone": string;
    "coverLetter": string;
    "jobId": string;
  }