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
      <v-expansion-panel-header fluid>All components</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
          :headers="headers"
          :items="data"
          :items-per-page="itemsPerPage"
          class="elevation-3"
          :search="search"
          :custom-filter="customFilterOnSelect"
          :loading="loading"
          :loading-text="loadingText"
          :page="selectedPage"
          :fixed-header="fixedHeader"
          @pagination="pagination"
        >
          <!-- Filters -->
          <template
            v-for="(colName, index) in filters"
            v-slot:[`header.${colName}`]="{ header }"
          >
            {{ header.text }}
            <v-menu :key="index" offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon small> mdi-filter-variant </v-icon>
                </v-btn>
              </template>

              <!-- Filter options -->
              <div class="filter-container">
                <!-- Search -->
                <v-text-field
                  v-if="filterKeys[colName].length >= 10"
                  label="Search"
                  @input="onSeachInput($event, header.value)"
                ></v-text-field>
                <!-- Checkbox -->
                <div v-else v-for="(data, index) in filterKeys[colName]" :key="index">
                  <v-checkbox
                    :label="data"
                    @click="onToggle(data, header.value)"
                    class="checkbox-container"
                  ></v-checkbox>
                </div>
              </div>
            </v-menu>
          </template>

          <!-- row data -->
          <template v-slot:item="{ item }">
            <tr @click="onTableRowSelection(item, $event)">
              <td v-for="(col, columnIndex) in headers" :key="columnIndex">
                <!-- Custom cell  -->
                <div v-if="!config[col.value].isDefault">
                  <!-- Outer Container -->
                  <div
                    :class="
                      config[col.value].style(item[col.value], item).mainContainerStyle
                    "
                  >
                    <!-- Inner Container -->
                    <div class="inner-container">
                      <!-- Action container -->
                      <span
                        v-if="
                          config[col.value].actions &&
                          config[col.value].actions.length !== undefined
                        "
                      >
                        <span
                          v-for="(action, index) in config[col.value].actions"
                          :key="index"
                        >
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                v-on="on"
                                medium
                                :color="action.iconColor"
                                @click="onActionTrigger(action.event, item)"
                                class="ma-1"
                              >
                                mdi-download</v-icon
                              >
                            </template>
                            <span>{{ action.tootip }}</span>
                          </v-tooltip>
                        </span>
                      </span>

                      <!-- Generic container -->
                      <span v-else>
                        <!-- Icon Holder  -->
                        <span
                          v-if="config[col.value].icon(item[col.value], item).name !== ''"
                        >
                          <v-icon
                            medium
                            :color="config[col.value].icon(item[col.value], item).color"
                          >
                            {{
                              config[col.value].icon(item[col.value], item).name
                            }}</v-icon
                          >
                        </span>

                        <!-- Text -->
                        <span
                          :class="
                            config[col.value].style(item[col.value], item)
                              .innerContainerStyle
                          "
                          >{{ config[col.value].text(item[col.value], item) }}</span
                        >
                      </span>
                    </div>
                  </div>
                </div>

                <!-- default text -->
                <div v-else>
                  <p>{{ item[col.value] }}</p>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
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
  methods: {
    onSeachInput(value, columnName) {
      if (value === "") {
        this.filteredColumnInfo[columnName] = [];
      } else {
        this.filteredColumnInfo[columnName] = [value];
      }

      //Triggering custom filter
      this.search = JSON.stringify(this.filteredColumnInfo);
    },
    onActionTrigger(event, rowData) {
      //emitting action
      this.$emit("onActionTrigger", {
        event,
        rowData,
      });
    },
    customFilterOnSelect(value, search, row) {
      let selectedFilters = [];

      this.filters.forEach((head) => {
        if (this.filteredColumnInfo[head].length > 0) {
          selectedFilters.push(head);
        }
      });

      let filterRow = true;

      selectedFilters.forEach((head) => {
        let objValue = row[head];
        let filterValues = this.filteredColumnInfo[head];

        let isMatch = false;

        filterValues.forEach((value) => {
          if (objValue.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1) {
            isMatch = true;
          }
        });

        if (isMatch == false) {
          filterRow = isMatch;
        }
      });

      return filterRow;
    },
    onToggle(value, columnName) {
      //Getting filtered values for specific column
      let filteredValues = this.filteredColumnInfo[columnName];

      //checking for value in the filtered list
      let index = filteredValues.indexOf(value);
      if (index !== -1) {
        filteredValues.splice(index, 1);
      } else {
        filteredValues.push(value);
      }

      //Triggering custom filter
      this.search = JSON.stringify(this.filteredColumnInfo);
    },
    configureTable() {
      //handling undefined/ missing data
      this.data.forEach((rowInfo) => {
        let rowList = Object.values(rowInfo);
        if (rowList.includes(null) || rowList.includes(undefined)) {
          console.warn("data contains undefined/null values");
          // this.data = [];
          //this.loading = true;
          // eslint-disable-next-line vue/no-mutating-props
          this.loadingText = "data contains undefined/null values";
          return;
        }
      });

      //handling configuration
      this.headers.forEach(({ value }) => {
        if (this.config[value] === undefined) {
          // eslint-disable-next-line vue/no-mutating-props
          this.config[value] = { isDefault: true };
        } else {
          if (typeof this.config[value].style !== "function") {
            // eslint-disable-next-line vue/no-mutating-props
            this.config[value].style = function () {
              return {
                mainContainerStyle: "",
                innerContainerStyle: "",
              };
            };
          }

          if (typeof this.config[value].icon !== "function") {
            // eslint-disable-next-line vue/no-mutating-props
            this.config[value].icon = function () {
              return {
                name: "",
                color: "",
              };
            };
          }

          if (typeof this.config[value].text !== "function") {
            // eslint-disable-next-line vue/no-mutating-props
            this.config[value].text = function (value) {
              return value;
            };
          }
        }
      });

      //header configuration for filter/sort functionality and style
      this.headers.forEach((header) => {
        if (header.filterable === undefined) {
          header.filterable = false;
        }

        if (header.sortable === undefined) {
          header.sortable = false;
        }

        // styling header
        if (this.headerClass !== "") {
          header.class = this.headerClass;
        }
      });

      //filtering filterable columns
      this.headers.forEach((header) => {
        if (header.filterable) {
          this.filters.push(header.value);
        }
      });

      let filterObj = {};
      //Creating data structure to hold filter keys
      this.filters.forEach((colName) => {
        let tempFilterKeys = [];
        //filtering filter keys
        this.data.forEach((rowInfo) => {
          if (!tempFilterKeys.includes(rowInfo[colName].toString())) {
            // excluding empty values
            if (rowInfo[colName].toString() !== "") {
              tempFilterKeys.push(rowInfo[colName].toString());
            }
          }
        });

        filterObj[colName] = [...tempFilterKeys];
      });

      this.filterKeys = filterObj;

      //data structure to store filtered values
      let filteredColumns = Object.keys(this.filterKeys);
      filteredColumns.forEach((header) => {
        this.filteredColumnInfo[header] = [];
      });

      //table Loading handler
      if (!this.data || 0 === this.data.length) {
        this.tableLoading = true;
      } else {
        this.tableLoading = false;
      }
    },
    onTableRowSelection: function (item, event) {
      event.path.forEach((element) => {
        // Table row
        if (element.localName == "tr") {
          // deselect
          if (element.classList.contains("selected")) {
            element.classList.remove("selected");
          }
          // select and deselect previously selected
          else {
            let selectedElementsList = document.querySelectorAll(".selected");
            selectedElementsList.forEach((tableRowElement) => {
              tableRowElement.classList.remove("selected");
            });
            element.classList.add("selected");
          }
        }
      });

      this.$emit("onTableRowSelection", { data: item, event });
    },
    pagination(pageInformation) {
      this.$emit("onPagination", pageInformation);
    },
  },
  watch: {
    data() {
      this.configureTable();
    },
  },
  created() {
    this.configureTable();
  },
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
