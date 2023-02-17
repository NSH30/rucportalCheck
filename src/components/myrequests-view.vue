<template>
  <div>
    <TableComponent
      :headers="headers"
      :data="data"
      :config="config"
      @onActiontrigger="requestActions()"
    />
    <div v-if="showPreview">
      <PreviewComponent
        :info="data"
        :previewDialog="previewDialog"
        @closeDialog="close()"
      />
    </div>
  </div>
</template>

<script>
import TableComponent from "/src/components/Table-Component";
import icons from "../assets/config/icons.json";
import PreviewComponent from "./Preview-Component.vue";

export default {
  components: {
    TableComponent,
    PreviewComponent,
  },
  data() {
    return {
      config: icons.MyRequests,
      ispreviewVisible: false,
      showPreview: false,
      previewDialog: true,
    };
  },
  props: {
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
    requestActions() {
      this.showPreview = true;
      /* console.log("****insideMyrequests ocmponent");
      this.config.forEach((element) => {
        if (element.event == "requestAccess") {
          this.isPreviewVisible = true;
        }
        if (element.event == "copyComponent") {
          console.log("**************linkCopied*********");
        } else {
          console.log("*******cancelRequest*********");
        }
      }); */
    },
    close() {
      this.showPreview = false;
    },
  },
};
</script>

<style>
.v-data-table__wrapper > table > thead > tr > th {
  background-color: #085889;
  color: white !important;
}
</style>
