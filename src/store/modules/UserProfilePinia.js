import { defineStore } from "pinia";
import axiosInstance from "../../axios";
import { toast } from "vue3-toastify";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    applications: [],
    error: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }

        // Make the GET request with the configured headers
        const response = await axiosInstance.get("/user", config);

        // Update the store state with the user data
        this.user = response.data;
        return this.user;
      } catch (error) {
        // Handle errors
        this.error = error.message;
      }
    },
    async updateUser(userData) {
      try {
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const response = await axiosInstance.put(
          `/users/${userData.id}`,
          userData,
          config
        );

        this.user = response.data;
        if (response.data.success === true) {
          toast.success(response.data.message, "🤝");
        } 
      } catch (error) {
        console.error("Error updating user:", error);
          if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("SQLSTATE[23505]")) {
            toast.error("Email duplicated", "👎");
          } else {
            toast.error("An error occurred while updating the user.", "👎");
          }
        } else {
          toast.error("An error occurred while updating the user.", "👎");
        }
      }
    },

    async register(userData) {
      try {
        //! if admin try add admin it must send token in register
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }

        const response = await axiosInstance.post(
          `/register`,
          userData,
          config
        );
        return response;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    async login(userData) {
      try {
        //! if admin try add admin it must send token in register

        const response = await axiosInstance.post(`/login`, userData);
        localStorage.setItem("token", response);
        localStorage.setItem("role", response.role);
        return response;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },

    async getUsersPaginated(pageNumber, role) {
      try {
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const response = await axiosInstance.get(
          `/users?page=${pageNumber}&role=${role}`,
          config
        );
        console.log("res = ", response.data.data);
        return response.data;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    async logout() {
      try {
        //! if admin try add admin it must send token in register
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const response = await axiosInstance.post(`/logout`, {}, config);
        return response;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    async fetchUserApplications(userId) {
      try {
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const response = await axiosInstance.get(
          `/applications/users/${userId}`,
          config
        );
        console.log("from pinia", response.data.applications);
        return response.data.applications;
      } catch (error) {
        console.error("Error fetching user applications:", error);
        throw error;
      }
    },
    async cancelApplication(applicationId) {
      try {
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const response = await axiosInstance.delete(
          `applications/${applicationId}`,
          config
        );
        if (response.status === 204) {
          this.applications = this.applications.filter(
            (app) => app.id !== applicationId
          );
          toast.success("Application canceled successfully", "👍");
        } else {
          toast.error("Failed to cancel application", "👎");
        }
      } catch (error) {
        console.error("Error canceling application:", error);
        throw error;
      }
    },
    async getEmployerApplications(pageNumber, user_id) {
      try {
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const response = await axiosInstance.get(
          `/applications/usersJobs/${user_id}?page=${pageNumber}`,
          config
        );
        return response;
      } catch (error) {
        console.error("Error fetching employer applications", error);
        throw error;
      }
    },
    async modifyApplicationStatus(status, application_id) {
      try {
        const token = localStorage.getItem("token");
        let config = {};
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const requestBody = {
          status: status,
          _method: "PUT",
        };
        await axiosInstance.post(
          `/applications/${application_id}`,
          requestBody,
          config
        );
      } catch (error) {
        console.error("Error modifying application status", error);
        throw error;
      }
    },
  },
});
