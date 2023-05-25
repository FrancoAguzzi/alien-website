<template>
  <div class="cloudinary-widget">
    <button @click="open" id="upload_widget" class="cloudinary-button">
      Submeter imagens
    </button>
  </div>
</template>

<script>
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.CLOUDINARY_UPLOAD_PREST;

export default {
  name: "UploadWidget",
  data: () => ({
    myWidget: null,
  }),
  props: {
    msg: String,
    leadName: String
  },
  computed: {
    folderPath() {
      return `/website-leads/${this.leadName || 'unknown'}`;
    }
  },
  methods: {
    open() {
      this.myWidget?.open();
    },
    updateWidget() {
      this.myWidget = cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          cropping: true,
          multiple: true,
          folder: this.folderPath,
          tags: ["lead"], //add the given tags to the uploaded files
          clientAllowedFormats: ["images"], //restrict uploading to image files only
          maxImageFileSize: 5000000,  //restrict file size to less than 2MB
          maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
          theme: "black", //change to a purple theme
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            document
              .getElementById("uploadedimage")
              .setAttribute("src", result.info.secure_url);
          }
        }
      );
    }
  },
  watch: {
    leadName: {
      handler(val) {
        if (!!val) {
          this.updateWidget();
        }
      },
      immediate: true // Add this line to call the handler immediately
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.cloudinary-widget {
  max-width: 100vw;
}

.cloudinary-button {
  border: 2px solid $dark-900;
  padding: 8px 16px;
  background: transparent;
  color: $dark-900;
  font-weight: 500;
  transition: all .2s;
}
</style>
