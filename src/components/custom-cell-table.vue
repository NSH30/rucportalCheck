<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="itemsPerPage"
    class="elevation-3"
    :search="search"
    :custom-filter="requested"
    :loading="loading"
    :loading-text="loadingText"
    :page="selectedPage"
    :fixed-header="fixedHeader"
    @pagination="pagination"
  >
    <template v-slot:[`item.action`]="{}">
      <span v-for="(action, index) in config" :key="index">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              medium
              :color="action.iconColor"
              @click="iconAction"
              class="ma-1"
            >
              {{ action.iconName }}</v-icon
            >
          </template>
          <span>{{ action.Tooltip }}</span>
        </v-tooltip>
      </span>
      <previewRuc v-if="isPreviewvisible" :RUCId="selectedComponentId" :info="data" />
    </template>
  </v-data-table>
</template>

<script>
import icons from "../assets/config/icons.json";
import previewRuc from "../components/Preview_ruc.vue";

export default {
  components: {
    previewRuc,
  },
  data() {
    return {
      search: "",
      config: icons.config,
      isPreviewvisible: false,
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
    iconAction(config) {
      console.log("******inIconActions********");
      if (config.event === "requestAccess") {
        this.isPreviewvisible = true;
      }
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
