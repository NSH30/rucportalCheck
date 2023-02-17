<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="itemsPerPage"
    class="elevation-3"
    :search="search"
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
              @click="iconActions()"
              class="ma-1"
            >
              {{ action.iconName }}
            </v-icon>
          </template>
          <span>{{ action.Tooltip }}</span>
        </v-tooltip>
      </span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      isPreviewVisible: false,
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
    config: {
      type: Array,
      Required: true,
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
    iconActions() {
      this.$emit("onActiontrigger");
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
