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
      link: "http//Hello",
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
      /*  switch (this.config.value == "event") {
        case "requestAccess":
          this.Preview();
          break;
        case "copyComponent":
          this.copyLink();
          break;
        case "cancelRequest":
          this.cancelReq();
          break;
      } */
      this.config.forEach((element) => {
        if (element.event == "requestAccess") {
          this.showPreview = true;
        } else if (element.event == "copyComponent") {
          const el = document.createElement("textarea");
          el.value = this.link;
          document.body.appendChild(el);
          el.select;
          document.execCommand("copy");
          document.body.removeChild(el);
          this.$toast.success("Link Copied to Clipboard");
        } else {
          console.log("*******cancelRequest*********");
        }
      });
    },

    Preview() {
      this.showPreview = true;
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
