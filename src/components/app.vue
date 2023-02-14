<template>
  <v-app>
    <v-row>
      <v-col class="text-right"
        ><v-btn small @click="requestedfilter()" class="ma-2" depressed color="primary"
          >My Request
        </v-btn>
        <v-btn small dark @click="btn2" depressed color="primary">All component </v-btn>
        <v-btn small dark @click="btn3" class="ma-2" depressed color="primary"
          >Admin
        </v-btn>

        <AddRUC
          :fields="fields"
          :formData="formData"
          @closeform="cancel()"
          @addform="addform()"
        />

        <CustomCellTable
          v-if="bt2"
          :headers="headers"
          :data="rows"
          :config="config"
          @onActionTrigger="onTableRowSelection"
          headerClass="tableHeader"
          :itemsPerPage="10"
        />

        <MyRequestTable
          v-if="bt1"
          :headers="headers"
          :data="rows"
          :config="config"
          @onActionTrigger="onTableRowSelection"
          headerClass="tableHeader"
          :itemsPerPage="10"
        />

        <!--  <admin-request
          v-if="bt3"
          :headers="childHeader"
          :data="rows"
          :config="config"
          @onActionTrigger="onTableRowSelection"
          headerClass="tableHeader"
          :itemsPerPage="10"
        >
        </admin-request> -->
        <admin-panel
          v-if="bt3"
          :headers="headers"
          :data="rows"
          :config="config"
          @onActionTrigger="onTableRowSelection"
          headerClass="tableHeader"
          :itemsPerPage="10"
        ></admin-panel>
        <!-- 
        <RequestDialog
          v-if="isModalVisible"
          @close="isModalVisible = false"
          :RUCId="selectedComponentId"
        /> -->

        <!--  <PreviewRuc
          :info="rows"
          v-if="isPreviewVisible"
          @closeDialog="cancel()"
          :RUCId="selectedComponentId"
        /> -->
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify";
import MyRequestTable from "./myRequestTable.vue";

// import Service from "../scripts/RUCService";
/* import PreviewRuc from "./Preview_ruc.vue"; */
import CustomCellTable from "./custom-cell-table.vue";
/* import RequestDialog from "./request-RUC-dialog.vue"; */
import AdminPanel from "./admin-panel.vue";
/* import AdminRequest from "./admin-request.vue"; */
import AddRUC from "./addRUC.vue";
import headers from "../assets/config/headers.json";
import formData from "../assets/config/data.json";
import fields from "../assets/config/fields.json";
import responseData from "../assets/config/responseData.json";

Vue.use(Vuetify);

export default {
  name: "App",
  components: {
    CustomCellTable,
    MyRequestTable,
    AdminPanel,
    AddRUC,
  },
  data() {
    return {
      selectedComponentId: "",
      fields: fields.fields,
      formData: formData,
      formbool: false,
      bt1: false,
      bt2: true,
      bt3: false,
      search: "",
      childHeader: [
        {
          text: "Title",
          align: "start",
          filterable: true,
          value: "title",
        },
        { text: "Description", value: "description" },
        { text: "Contact Person", value: "contact" },
        {
          text: "Status",
          value: "status",
          filter: (value) => {
            return value == "Requested" /* || value == "Pending" */;
          },
        },
        { text: "Actions", value: "action" },
      ],
      headers: headers,

      rows: [],
      myloadingvariable: false,
      selectedRows: [],
      isPreviewVisible: false,
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
    requestedfilter() {
      this.btn2 = true;
      return this.responseData.filter(
        (responseData) => responseData.status == "Requested"
      );
    },
    cancel() {
      this.dialog = false;
    },
    addform() {
      //this.dialog=false;
      console.log("formdata", this.formData);
    },
    cancelPreview() {
      this.isPreviewVisible = false;
    },
    formBool() {
      this.formbool = true;
    },
    /*  onTableRowSelection(data) {
      console.log("----- in onTableRowSelection -----");
      if (data.config.event === "requestAccess") {
        this.isPreviewVisible = true;
        this.selectedComponentId = data.id;
      }
    }, */

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
