<template>
  <v-app>
    <v-row>
      <v-col class="text-right"
        ><v-btn small @click="btn1()" class="ma-2" depressed dark color="#085889"
          >My Request
        </v-btn>
        <v-btn small dark @click="btn2()" depressed color="#085889">All component </v-btn>
        <v-btn small dark @click="btn3()" class="ma-2" depressed color="#085889"
          >Admin
        </v-btn>

        <RucForm
          :fields="fields"
          :formData="formData"
          @closeform="cancel()"
          @addform="addform()"
        />
        <allcomonentview v-show="bt2" :itemsPerPage="10" />

        <MyRequestTable
          v-show="bt1"
          :headers="reqHeaders"
          :data="rows"
          :config="MyreqIcons"
          headerClass="tableHeader"
          :itemsPerPage="10"
        />

        <AdminComponent
          v-show="bt3"
          :headers="headers"
          :reqHeaders="reqHeaders"
          :data="rows"
          headerClass="tableHeader"
          :itemsPerPage="10"
        />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify";
import MyRequestTable from "./myrequests-view.vue";
/* import TableComponent from "./Table-Component.vue"; */
import AdminComponent from "./admin-view.vue";
import RucForm from "./RucForm-Component.vue";
import headers from "../assets/config/headers.json";
import formData from "../assets/config/data.json";
import fields from "../assets/config/fields.json";
import responseData from "../assets/config/responseData.json";
import icons from "../assets/config/icons.json";
import allcomonentview from "./allcomponent-view";

Vue.use(Vuetify);

export default {
  name: "App",
  components: {
    /* TableComponent, */
    MyRequestTable,
    AdminComponent,
    RucForm,
    allcomonentview,
  },
  data() {
    return {
      fields: fields.fields,
      formData: formData,
      formbool: false,
      bt1: false,
      bt2: true,
      bt3: false,
      search: "",
      headers: headers.Headers,
      reqHeaders: headers.ReqHeaders,
      AllcompIcons: icons.AllComponents,
      MyreqIcons: icons.MyRequests,
      rows: [],
      myloadingvariable: false,
      selectedRows: [],
      isPreviewVisible: false,
      approvedialog: false,
    };
  },
  mounted: async function () {
    console.log("Inside app vue mounted function.");
    this.myloadingvariable = true;
    //const response = await Service.getReusableComponents();
    //add more test data if required
    const response = responseData;
    response.forEach((r) => {
      const e = {
        ...r,
        actions: r.id,
      };
      this.rows.push(e);
    });
    this.myloadingvariable = false;
  },
  methods: {
    approveClick() {
      this.approvedialog = true;
    },

    PreviewVisible() {
      this.isPreviewVisible = true;
    },

    addform() {
      //this.dialog=false;
      console.log("formdata", this.formData);
    },

    formBool() {
      this.formbool = true;
    },

    btn1() {
      this.bt1 = true;
      this.bt2 = false;
      this.bt3 = false;
    },
    btn2() {
      this.bt2 = true;
      this.bt1 = false;
      this.bt3 = false;
    },

    btn3() {
      this.bt3 = true;
      this.bt2 = false;
      this.bt1 = false;
    },
  },
};
</script>

<style>
#app {
  overflow: auto;
  height: 100%;
}
.t {
  text-align: center;
}

.tableHeader > * {
  color: white !important;
}

.tableHeader {
  background-color: #085889 !important;
  color: white !important;
}

.active {
  background-color: rgb(145, 187, 66);
  padding: 5px;
  border-radius: 4px;
  color: white;
}

.in-active {
  background-color: rgb(206, 118, 118);
  padding: 5px;
  border-radius: 4px;
  color: white;
}

.neutral {
  background-color: rgb(211, 205, 205);
  padding: 5px;
  border-radius: 4px;
  color: rgb(17, 17, 17);
}
</style>
