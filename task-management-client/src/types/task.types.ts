export type ApiTask = {
  _id: string;
  project: {
    _id: string;
    projectName: string;
  };
  title: string;
  status: string;
  assignedTo: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type ListTask = {
  id: string;
  name: string;
  project: {
    id: string;
    name: string;
  };
  assignedTo: {
    id: string;
    name: string;
  };
  status: string;
};
