<template>
    <div class="container">
      <div v-if="isSaving" class="progress">
        <v-progress-circular
          :size="100"
          :width="15"
          :rotate="360"
          :value="value"
          color="teal">
            {{ value }}
        </v-progress-circular>
      </div>
      <div v-if="isInitial" class="dropzone">
        <!--UPLOAD-->
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <div class="dropbox">
            <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
              <p v-if="isInitial">
                Drag your file(s) here to begin<br> or click to browse
              </p>
              <p v-if="isSaving">
                Uploading {{ fileCount }} files...
              </p>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import scp from "scp2";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

const client = new scp.Client();

export default {
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "file",
      value: 0
    };
  },
  created() {
    this.createClient();
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    createClient() {
      var data = this;

      client.on("transfer", function(buf, uploading, total) {

        data.value = Math.trunc(((uploading+1) / total) * 100);
        
        if (data.value == 100) {
          data.currentStatus = STATUS_INITIAL;
          data.value = 0;
        }
        
      });
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      this.currentStatus = STATUS_SAVING;

      scp.scp(
        fileList[0].path,
        "pntdesa:RPJ82YMaMiFFTt9RgVhp@dev.somospnt.com:/home/pntdesa",
        client,
        function(err) {
          if (err) {
            console.log(err);
          }
        }
      );
      
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: dimgray;
  color: black;
  padding: 10px 10px;
  min-height: 50px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 50%;
  height: 50px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>