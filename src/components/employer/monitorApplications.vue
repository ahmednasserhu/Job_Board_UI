<template>
    <div>
      <div class="container">
        <div v-if="isLoading" class="text-center card-box">
  <button class="btn btn-primary" type="button" disabled>
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    Loading...
  </button>      
  </div>
        <div v-else>
          <div class="text-center card-box">
            <div class="member-card">
              <div class="text-left m-t-40">
                <div v-if="!loading" class="container mt-5">
      <div class="col-md-12">
        <div
          v-if="filteredApplications && filteredApplications.length > 0"
          class="panel panel-default"
        >
          <div class="panel-body">
            <table class="table table-condensed table-striped">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Title</th>
                  <th>View Application</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(application, index) in filteredApplications" :key="application.id">
                  <td>
                    <img
                      :src="application.job_listings.logo"
                      :style="{ width: '100px', height: 'auto' }"
                      alt
                    />
                  </td>
                  <td>{{ application.job_listings.title }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="openResume(application.resume)"
                    >View Resume</button>
                  </td>
                  <td>{{ application.job_listings.application_deadline }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="text-center mt-1">
          <p class="text-muted">There are currently no applications to monitor.</p>
          <img src="../../assets/no_applications.png" alt="No Applications Found">
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
              </div>
            </div>
          </div>
          
          <!-- end card-box -->
          <div class="col-md-8 col-lg-9">
            <div class>
              <div class>
                <ul class="nav nav-tabs navtab-custom">
                  <li class>
                    <RouterLink class="nav-link" to="/employer/pendingApplications">Pending</RouterLink>
                  </li>
                  <li class>
                    <RouterLink class="nav-link" to="/employer/approvedApplications">Approved</RouterLink>
                  </li>
                  <li class>
                    <RouterLink class="nav-link" to="/employer/rejectedApplications">Rejected</RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
  </template>
  
  
<script>
import { useUserStore } from "../../store/modules/UserProfilePinia";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      loading: true,
      data: {
        applications: []
      }
    };
  },
  methods: {
    async getEmployerApplications() {
      try {
        const id = 4;
        const response = await useUserStore().getEmployerApplications(id);
        this.data = response.data;
        this.loading = false;
        console.log(this.data);
      } catch (error) {
        console.error("Error fetching employer applications", error);
        this.loading = false;
      }
    },
    openResume(resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
  },
  computed: {
    filteredApplications() {
      return this.data.applications.filter(
        application => application.status === "pending"
      );
    }
  },
  created() {
    this.getEmployerApplications();
  }
};
</script>
  
  
  
  <style scoped>
  .container {
    margin-top: 20px;
    padding-top: 50px;
    background: rgb(248, 249, 250);
  }
  
  .welcome-message {
    margin-top: 20px;
    text-align: center;
    width: 800px;
    height: 260px;
    background-image: url("https://www.shutterstock.com/image-vector/welcome-message-office-manager-boss-260nw-2270734631.jpg");
  }
  .welcome-message i {
    color: #ffc107; /* You can change the color to match your theme */
    margin: 0 5px;
    font-size: 30px;
    margin-top: 250px;
  }
  .welcome-message h2 {
    font-size: 25px;
    margin-right: 10px;
    color: rgb(140, 140, 210);
    font-weight: bolder;
  }
  /* ===========
     Profile
   =============*/
  .card-box {
    padding: 20px;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.06), 0 2px 0 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #ffffff;
  }
  .header-title {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 16px;
    margin-bottom: 8px;
  }
  .social-links li a {
    -webkit-border-radius: 50%;
    background: #eff0f4;
    border-radius: 50%;
    color: #7a7676;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 30px;
  }
  
  /* ===========
     Gallery
   =============*/
  .portfolioFilter a {
    -moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    -webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
    -webkit-transition: all 0.3s ease-out;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
    color: #333333;
    padding: 5px 10px;
    display: inline-block;
    transition: all 0.3s ease-out;
  }
  .portfolioFilter a:hover {
    background-color: #228bdf;
    color: #ffffff;
  }
  .portfolioFilter a.current {
    background-color: #228bdf;
    color: #ffffff;
  }
  .thumb {
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    margin-top: 30px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    width: 100%;
  }
  .thumb-img {
    border-radius: 2px;
    overflow: hidden;
    width: 100%;
  }
  .gal-detail h4 {
    margin: 16px auto 10px auto;
    width: 80%;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .gal-detail .ga-border {
    height: 3px;
    width: 40px;
    background-color: #228bdf;
    margin: 10px auto;
  }
  
  .tabs-vertical-env .tab-content {
    background: #ffffff;
    display: table-cell;
    margin-bottom: 30px;
    padding: 30px;
    vertical-align: top;
  }
  .tabs-vertical-env .nav.tabs-vertical {
    display: table-cell;
    min-width: 120px;
    vertical-align: top;
    width: 150px;
  }
  .tabs-vertical-env .nav.tabs-vertical li.active > a {
    background-color: #ffffff;
    border: 0;
  }
  .tabs-vertical-env .nav.tabs-vertical li > a {
    color: #333333;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    white-space: nowrap;
  }
  .nav.nav-tabs > li.active > a {
    background-color: #ffffff;
    border: 0;
  }
  .nav.nav-tabs > li > a {
    background-color: transparent;
    border-radius: 0;
    border: none;
    color: #333333 !important;
    cursor: pointer;
    line-height: 50px;
    font-weight: 500;
    padding-left: 20px;
    padding-right: 20px;
    font-family: "Roboto", sans-serif;
  }
  .nav.nav-tabs > li > a:hover {
    color: #228bdf !important;
  }
  .nav.tabs-vertical > li > a {
    background-color: transparent;
    border-radius: 0;
    border: none;
    color: #333333 !important;
    cursor: pointer;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .nav.tabs-vertical > li > a:hover {
    color: #228bdf !important;
  }
  .tab-content {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    color: #777777;
  }
  .nav.nav-tabs > li:last-of-type a {
    margin-right: 0px;
  }
  .nav.nav-tabs {
    border-bottom: 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  }
  .navtab-custom li {
    margin-bottom: -2px;
  }
  .navtab-custom li a {
    border-top: 2px solid transparent !important;
  }
  .navtab-custom li.active a {
    border-top: 2px solid #228bdf !important;
  }
  .nav-tab-left.navtab-custom li a {
    border: none !important;
    border-left: 2px solid transparent !important;
  }
  .nav-tab-left.navtab-custom li.active a {
    border-left: 2px solid #228bdf !important;
  }
  .nav-tab-right.navtab-custom li a {
    border: none !important;
    border-right: 2px solid transparent !important;
  }
  .nav-tab-right.navtab-custom li.active a {
    border-right: 2px solid #228bdf !important;
  }
  .nav-tabs.nav-justified > .active > a,
  .nav-tabs.nav-justified > .active > a:hover,
  .nav-tabs.nav-justified > .active > a:focus,
  .tabs-vertical-env .nav.tabs-vertical li.active > a {
    border: none;
  }
  .nav-tabs > li.active > a,
  .nav-tabs > li.active > a:focus,
  .nav-tabs > li.active > a:hover,
  .tabs-vertical > li.active > a,
  .tabs-vertical > li.active > a:focus,
  .tabs-vertical > li.active > a:hover {
    color: #228bdf !important;
  }
  
  .nav.nav-tabs + .tab-content {
    background: #ffffff;
    margin-bottom: 20px;
    padding: 20px;
  }
  .progress.progress-sm .progress-bar {
    font-size: 8px;
    line-height: 5px;
  }
  </style>