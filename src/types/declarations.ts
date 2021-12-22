export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  userId: string;
}

type experience = {
  organization: string;
  position: string;
  start: string;
  end: string;
  address: string;
  state: number;
};

type education = {
  institution: string;
  qualification: string;
  fieldOfStudy: string;
  graduationDate: string;
  state: number;
};

export type credential = {
  name: string;
  url: string;
  id?: string;
  fileType: string;
  userId: string;
};
export interface CVType {
  fullName: string;
  address: string;
  age: number;
  phoneNumber: string;
  state: number;
  lga: number;
  sex: string;
  isApproved: boolean;
  profilePicture: string;
  experiences: experience[];
  education: education[];
  credentials: credential[];
  guarrantor: {
    fullName: string;
    address: string;
    age: number;
    phoneNumber: string;
    state: number;
    lga: number;
    sex: string;
  };
}
