<template>
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
        <customCellTable
          :headers="headers"
          :data="data"
          :config="config"
          headerClass="tableHeader"
          :itemsPerPage="10"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header fluid>All components</v-expansion-panel-header>
      <v-expansion-panel-content>
        <customCellTable
          :headers="headers"
          :data="data"
          :config="config"
          headerClass="tableHeader"
          :itemsPerPage="10"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import customCellTable from "/src/components/custom-cell-table";

export default {
  components: {
    customCellTable,
  },
  data() {
    return {
      search: "",
      filters: [],
      filterKeys: {},
      filteredColumnInfo: {},
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
