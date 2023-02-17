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
import TableComponent from "./Table-Component.vue";
import PreviewComponent from "./Preview-Component.vue";
import headers from "../assets/config/headers.json";
import icons from "../assets/config/icons.json";
import responseData from "../assets/config/responseData.json";

export default {
  components: {
    TableComponent,
    PreviewComponent,
  },
  data() {
    return {
      config: icons.AllComponents,
      headers: headers.Headers,
      ispreviewVisible: false,
      data: responseData,
      showPreview: false,
      previewDialog: true,
    };
  },
  methods: {
    viewPreview() {
      this.ispreviewVisible = true;
    },
    requestActions() {
      this.showPreview = true;
    },
    close() {
      this.showPreview = false;
    },
  },
};
</script>
