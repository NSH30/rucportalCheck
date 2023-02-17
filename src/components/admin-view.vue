<template>
  <div>
    <!--  <div v-show="showPreview"> -->
    <PreviewComponent
      :info="data"
      :previewDialog="previewDialog"
      @closeDialog="close()"
    />
    <!-- </div>
    <div v-show="showAdminActions"> -->
    <Approvedialog :data="data" :approveDialog="approveDialog" />
    <!-- </div> -->
    <v-expansion-panels
      focusable
      flat
      accordion
      v-model="panel"
      :disabled="disabled"
      multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-header fluid>Pending Approval</v-expansion-panel-header>
        <v-expansion-panel-content>
          <TableComponent
            :headers="reqHeaders"
            :data="data"
            :config="config"
            @onActiontrigger="approveClick()"
            headerClass="tableHeader"
            :itemsPerPage="10"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header fluid>All components</v-expansion-panel-header>
        <v-expansion-panel-content>
          <TableComponent
            :headers="headers"
            :data="data"
            @onActiontrigger="Previewvisible()"
            :config="icons"
            headerClass="tableHeader"
            :itemsPerPage="10"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import TableComponent from "/src/components/Table-Component";
import icons from "../assets/config/icons.json";
import PreviewComponent from "./Preview-Component.vue";
import Approvedialog from "./AdminApprove-Component.vue";

export default {
  components: {
    TableComponent,
    PreviewComponent,
    Approvedialog,
  },
  data() {
    return {
      search: "",
      filters: [],
      filterKeys: {},
      filteredColumnInfo: {},
      icons: icons.AllComponents,
      config: icons.AdminRequests,
      /*    showPreview: false,
      showAdminActions: false, */
      previewDialog: false,
      approveDialog: false,
    };
  },
  props: {
    reqHeaders: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    itemsPerPage: {
      type: Number,
      default: 15,
    },
    loadingText: {
      type: String,
      default: "Please wait ...",
    },
    selectedPage: {
      type: Number,
      default: 1,
    },
    headerClass: {
      type: String,
      default: "",
    },
    fixedHeader: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    Previewvisible() {
      this.previewDialog = true;
    },
    approveClick() {
      this.approveDialog = true;
    },
  },
  close() {
    this.previewDialog = false;
  },
  /* pagination(pageInformation) {
    this.$emit("onPagination", pageInformation);
  }, */
  /* watch: {
    data() {
      this.configureTable();
    },
  }, */
  /*  created() {
    this.configureTable();
  }, */
};
</script>

<style scoped>
/* checkbox container styles */
.filter-container {
  background-color: white;
  z-index: 100;
  overflow: auto;
  max-height: 300px;
  padding: 10px 30px 20px 10px;
}
.checkbox-container {
  height: 20px;
  margin-bottom: 10px;
  background-color: white;
}

.inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.v-expansion-panel-content__wrap {
  padding: 0px;
}
</style>
