<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="itemsPerPage"
    class="elevation-3"
    :search="search"
    disable-sort
    :custom-filter="requested"
    :loading="loading"
    :loading-text="loadingText"
    :page="selectedPage"
    :fixed-header="fixedHeader"
    @pagination="pagination"
  >
    <template v-slot:[`item.action`]="{}">
      <v-tooltip v-model="show" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="grey lighten-1"> mdi-content-copy </v-icon>
          </v-btn>
        </template>
        <span>Copy</span>
      </v-tooltip>
      <v-tooltip v-model="show" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="grey lighten-1"> mdi-home </v-icon>
          </v-btn>
        </template>
        <span>Home</span>
      </v-tooltip>
      <v-tooltip v-model="show" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="grey lighten-1"> mdi-eye-outline </v-icon>
          </v-btn>
        </template>
        <span>Preview</span>
      </v-tooltip>
      <v-tooltip v-model="show" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="grey lighten-1"> mdi-cancel </v-icon>
          </v-btn>
        </template>
        <span>Cancel Request</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      greeting: "Hello World!",
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
      type: Object,
      default() {
        return {};
      },
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
};
</script>

<style>
.v-data-table__wrapper > table > thead > tr > th {
  background-color: #085889;
  color: white !important;
}

.greeting {
  color: red;
  font-weight: bold;
}
</style>
