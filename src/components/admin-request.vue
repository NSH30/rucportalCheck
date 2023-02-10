<template>
  <div>
    <v-dialog max-width="600" v-model="dialog">
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Approve/Reject Request
            <v-spacer></v-spacer>
            <v-icon>mdi-co</v-icon>
          </v-toolbar>
          <v-card-text>
            <div class="pa-5">
              <p>Purpose :</p>
              <p>Project :</p>
              <p>Comments *</p>
              <v-textarea
                auto-grow
                rows="1"
                filled
                name="input-7-4"
                label="Filled textarea"
                value="Some Random text for demonstration purpose"
              ></v-textarea>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary" small dark @click="dialog.value = false"
              >Approve</v-btn
            >
            <v-btn
              color="error"
              small
              primary
              dark
              @click="dialog.value = false"
              >Reject</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-expansion-panels
      focusable
      accordion
      v-model="panel"
      :disabled="disabled"
      multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-header>Pending Approval</v-expansion-panel-header>
        <v-expansion-panel-content>
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
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="dialog = true">
                    <v-icon>mdi-alpha-a</v-icon>
                  </v-btn>
                </template>
                <span>Approval</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      greeting: "Hello World!",
      panel: [0, 1],
      disabled: false,
      readonly: false,
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

.expMargin {
  padding: 0px;
}
.expMargin {
  padding: 0px;
}
.v-expansion-panel-content__wrap {
  padding: 0px;
}
</style>
