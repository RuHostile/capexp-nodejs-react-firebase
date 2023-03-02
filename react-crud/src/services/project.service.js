import http from "../http-common";

class ProjectDataService {
  getAll() {
    return http.get("/projects");
  }

  get(id) {
    return http.get(`/projects/${id}`);
  }

  create(data) {
    return http.post("/projects", data);
  }

  update(id, data) {
    return http.put(`/projects/${id}`, data);
  }

  delete(id) {
    return http.delete(`/projects/${id}`);
  }

  deleteAll() {
    return http.delete(`/projects`);
  }

  findByProjectName(projectName) {
    return http.get(`/projects?projectname=${projectName}`);
  }

  updateCapExp(id, capitalExpenditure){
    return http.put(`/projects/updateCapExp${id}`, capitalExpenditure);
  }
}

export default new ProjectDataService();