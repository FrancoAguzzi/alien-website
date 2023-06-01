<template>
  <div class="cloudinary-widget">
    <button @click="open" id="upload_widget" class="cloudinary-button">
      Selecionar imagens
    </button>
  </div>
</template>

<script>
import { citiesList } from '../utils';
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

export default {
  name: "UploadWidget",
  data: () => ({
    myWidget: null,
    citiesList
  }),
  props: {
    leadName: String,
    leadPhone: String,
    city: String
  },
  methods: {
    open() {
      if (this.leadName && this.leadPhone.length === 15) {
        this.updateWidget()
      } else {
        alert('Por favor, preencha seu nome e telefone primeiro 👽')
      }
    },
    updateWidget() {
      this.myWidget = cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: this.citiesList.find(city => city.name === this.city).uploadPreset,
          cropping: true,
          multiple: true,
          folder: `/${this.leadName}`,
          tags: ["agenda_lead"], //add the given tags to the uploaded files
          clientAllowedFormats: ["images"], //restrict uploading to image files only
          maxImageFileSize: 5000000,  //restrict file size to less than 2MB
          maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
          theme: "black", //change to a purple theme
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
          }
        }
      );

      this.myWidget?.open();
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
