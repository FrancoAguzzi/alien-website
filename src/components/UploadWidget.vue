<template>
  <div class="cloudinary-widget">

    <h4 v-if="!imageSent">Agora você poderá submeter valiosas referências para o desenvolvimento de sua ideia:</h4>
    <h4 v-else>
      <div class="post-message">
        <p>
          🛸
        </p>
        <div>
          Suas referências foram muito importantes! Agora é só esperar, enquanto isso <a
            href="https://www.instagram.com/alienstudio.art/">veja as criações de nossos
            artistas</a>
        </div>
      </div>

    </h4>
    <button v-if="!imageSent" @click="open" id="upload_widget" class="cloudinary-button">
      Selecionar imagens
    </button>
  </div>
</template>

<script>
import { citiesList } from '../utils';

export default {
  name: "UploadWidget",
  data: () => ({
    myWidget: null,
    imageSent: false,
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
      const selectedCityObject = this.citiesList.find(city => city.name === this.city);
      const imageUploadPreset = selectedCityObject.uploadPreset;

      this.myWidget = cloudinary.createUploadWidget(
        {
          multiple: true,
          cropping: true,
          showSkipCropButton: true,
          singleUploadAutoClose: false,
          publicIdPrefix: `${selectedCityObject.folderName}/${this.leadName}-${this.leadPhone.slice(this.leadPhone.length - 4)}`,
          folder: `/website-agenda/${selectedCityObject.folderName}/${this.leadName}-${this.leadPhone.slice(this.leadPhone.length - 4)}`,
          uploadPreset: imageUploadPreset,
          api_key: process.env.VUE_APP_CLOUDINARY_API_KEY,
          cloudName: process.env.VUE_APP_CLOUDINARY_CLOUD_NAME,
          tags: ["agenda_lead"], //add the given tags to the uploaded files
          clientAllowedFormats: ["png", "jpeg", "jpg"], //restrict uploading to image files only
          theme: "minimal", //change to a purple themestyles:{
          palette: {
            window: "#FFF",
            windowBorder: "#000",
            tabIcon: "#333436",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#121212",
            action: "#bdbbbb",
            inactiveTabIcon: "#7c7d7d",
            error: "#F44235",
            inProgress: "#d4c955",
            complete: "#20B832",
            sourceBg: "#E4EBF1"
          },
          frame: {
            background: "#0E2F5B99"
          },
          fonts: {
            "'Proxima Nova Regular', sans-serif": "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;600;700&display=swap",
          }
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            alert('Imagem enviada com sucesso! 👽')
            this.imageSent = true
          }
        }
      );

      this.myWidget?.open();
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.cloudinary-widget {
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
  }
}

.cloudinary-button {
  border: 2px solid $dark-900;
  padding: 8px 16px;
  background: transparent;
  color: $dark-900;
  font-weight: 500;
  transition: all .2s;
}

h4 {
  margin-top: 0;
  display: flex;
  text-align: center;
  align-items: center;

  p {
    margin-top: -12px;
    margin-bottom: 12px;
  }

  a {
    text-decoration: underline;
    color: black;
  }

  @media screen and (min-width: 768px) {

    text-align: left;

    .post-message {
      display: flex;
      flex-direction: row;
      align-items: center;

      p {
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>
