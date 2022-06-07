<template>
  <div>
    <section class="s-perfil">
      <div class="container">
        <MenuLeftpProfile />
        <ContentProfile>
          <div class="title-area">
            <h3>Dados pessoais</h3>
            <p>Confirme e edite seus dados pessoais</p>
          </div>

          <div v-if="!isLoading" class="box-dados-pessoais">
            <form @submit.prevent="sendUserData" autocomplete="off">
              <div class="user">
                <ProfilePicture
                  :userPhoto="dataUser?.userPhoto"
                  :userFirstname="dataUser?.userFirstname"
                ></ProfilePicture>
                <div
                  class="photo"
                  v-bind:style="{ 'background-image': 'url(' + photo + ')' }"
                  v-if="photo !== ''"
                ></div>
                <div class="info">
                  <h3>{{ userData.userFirstname }} {{ userData.userLastname }}</h3>
                  <div class="upload">
                    <!-- accept="image/jpg" -->
                    <input
                      type="file"
                      id="fileInput"
                      @change="updateProfileImage($event.target.files[0])"
                    />
                    <!-- <img src="@/assets/img/icon-upload.svg" alt="" /> -->
                    <span>Alterar foto de perfil</span>
                  </div>
                </div>
              </div>
              <div class="item-form">
                <div class="title-form">
                  <!-- <img src="@/assets/img/icon-persona.svg" alt="" /> -->
                  <h4>Informações pessoais</h4>
                </div>
                <div class="form-double">
                  <div class="form-group">
                    <label for="">Nome</label>
                    <input v-letter v-model="userData.userFirstname" type="text" />
                  </div>
                  <div class="form-group">
                    <label for="">Sobrenome</label>
                    <input v-letter v-model="userData.userLastname" type="text" />
                  </div>
                </div>
                <div class="form-double">
                  <div class="form-group">
                    <label for="">E-mail</label>
                    <input v-model="userData.userEmail" type="email" readonly />
                  </div>
                  <div class="form-group">
                    <SelectBirthDate
                      @setBirthDate="setBirthDate($event)"
                      :userBirth="userData.userBirthdate.split('-')"
                    />
                  </div>
                </div>
                <div class="form-double">
                  <div class="form-group">
                    <label for="">Telefone</label>
                    <input
                      type="text"
                      v-model="userData.userPhone"
                      maxlength="15"
                      @input="formatPhone($event.target.value)"
                    />
                  </div>
                  <div class="form-group">
                    <label for="">CPF</label>
                    <input type="text" readonly v-model="formatcpf" maxlength="15" />
                  </div>
                </div>
              </div>
              <div class="item-form">
                <div class="title-form">
                  <!-- <img src="@/assets/img/icon-pin.svg" alt="" /> -->
                  <h4>Endereço</h4>
                </div>
                <div class="form-double">
                  <div class="form-group">
                    <label for="">CEP *</label>
                    <input
                      v-model="userData.userAddress.zipcode"
                      maxlength="8"
                      type="text"
                      @input="getCEPData($event.target.value)"
                    />
                  </div>
                </div>
                <div class="form-double end">
                  <div class="form-group">
                    <label for="">Endereço *</label>
                    <input v-model="userData.userAddress.street" type="text" />
                  </div>
                  <div class="form-group">
                    <label for="">Número *</label>
                    <input v-model="userData.userAddress.number" type="text" />
                  </div>
                </div>
                <div class="form-double">
                  <div class="form-group">
                    <label for="">Complemento</label>
                    <input v-model="userData.userAddress.complement" type="text" />
                  </div>
                  <div class="form-group">
                    <label for="">Bairro</label>
                    <input v-model="userData.userAddress.neighborhood" type="text" />
                  </div>
                </div>
                <div class="form-double">
                  <div class="form-group">
                    <label for="">Estado</label>
                    <select name="" id="" v-model="userData.userAddress.state">
                      <option
                        v-for="(state, index) in uf"
                        :key="index"
                        selected
                        :value="state.label"
                      >
                        {{ state.label }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="">Cidade *</label>
                    <input v-model="userData.userAddress.city" type="text" />
                  </div>
                </div>
              </div>
              <div class="item-form">
                <button class="btn-primary">
                  <LoaderBtn v-show="isUpdating" />
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </ContentProfile>
      </div>

      <AlertToasty
        v-show="status.show"
        @closeModal="closeModal($event)"
        :status="status.code"
        :message="status.message"
        :title="status.title"
      />
    </section>
  </div>
</template>

<script>
import http from '@/http';
import { mapGetters } from 'vuex';
import { utils } from '@/mixins/utils.js';
import { uf } from '@/Utils/selectsValues';
import LoaderBtn from '@/components/LoaderBtn';
import AlertToasty from '@/components/AlertToasty';
import SelectCountry from '@/components/SelectCountry';
import ProfilePicture from '@/components/ProfilePicture';
import ContentProfile from '@/components/ContentProfile';
import SelectBirthDate from '@/components/SelectBirthDate';
import MenuLeftpProfile from '@/components/MenuLeftpProfile';

export default {
  name: 'PersonalData',
  components: {
    LoaderBtn,
    AlertToasty,
    SelectCountry,
    ContentProfile,
    ProfilePicture,
    SelectBirthDate,
    MenuLeftpProfile,
  },
  mixins: [utils],
  data() {
    return {
      isLoading: true,
      isUpdating: false,
      uf,
      photo: '',
      userData: {
        country: null,
        userFirstname: null,
        userLastname: null,
        userEmail: null,
        userPhone: null,
        userBirthdate: '',
        userPhoto: null,
        userAddress: {
          zipcode: null,
          country: 'Brazil',
          state: null,
          street: null,
          number: null,
          complement: null,
          neighborhood: null,
        },
      },
      status: { message: null, code: null, show: false, title: null },
    };
  },
  computed: {
    ...mapGetters(['dataUser']),
    formatcpf: function() {
      return this.cpfFormater(this.userData?.userDocument?.documentRegister);
    },
  },
  mounted() {
    Object.keys(this.dataUser).map((key) => {
      this.userData[key] = this.dataUser[key];
    });

    this.userData.userBirthdate = this.formatDateToInput(this.userData.userBirthdate);
    this.userData.userPhone = this.numericOnly(this.userData.userPhone);
    this.userData.userAddress = this.dataUser?.userAddress;

    this.isLoading = false;
  },
  methods: {
    setCountry(country) {
      this.userData.userAddress.country = country;
    },
    formatPhone(phone) {
      if (phone !== null && phone !== '') {
        this.userData.userPhone = this.numberCellPhone(phone);
      }
    },
    updateProfileImage(file) {
      if (this.checkIfImageIsValid(file)) {
        const base64 = new FileReader();
        base64.readAsDataURL(file);
        base64.onload = (e) => {
          http
            .post('/user/uploadPhoto', { userID: this.userData.userID, picBase64: e.target.result })
            .then((response) => {
              this.photo = e.target.result;
              this.$store.dispatch('getUserData').then((resp) => {
                delete this.userData.userPhoto;
              });
            });
        };
      } else {
        document.getElementById('fileInput').value = '';
        this.openToasty(
          true,
          'Por favor, insira uma imagem em JPEG com tamanho inferior a 4MB.',
          500,
          'Arquivo inválido'
        );
      }
    },
    sendUserData() {
      this.isUpdating = true;
      const objectToPost = {
        userFirstname: this.userData.userFirstname,
        userLastname: this.userData.userLastname,
        userPhone: this.userData.userPhone,
        userBirthdate: new Date(this.userData.userBirthdate).toISOString(),
        userAddress: {
          zipcode: this.formatCEP(this.userData.userAddress.zipcode) || '00000-000',
          country: 'Brazil',
          state: this.userData.userAddress.state,
          street: this.userData.userAddress.street,
          number: this.userData.userAddress.number,
          city: this.userData.userAddress.city,
          complement: this.userData.userAddress.complement,
          neighborhood: this.userData.userAddress.neighborhood,
        },
      };
      http.put('/user/updateMe', objectToPost).then((response) => {
        if (response.data.status) {
          this.$store.dispatch('getUserData');
          this.openToasty(true, 'Seu cadastro foi atualizado.', 200, 'Sucesso!');
        } else {
          this.openToasty(
            true,
            'Por favor, preencha todos os campos corretamente.',
            500,
            'Erro ao atualizar.'
          );
        }

        this.isUpdating = false;
      });
    },
    setBirthDate(event) {
      this.userData.userBirthdate = event;
    },
    getCEPData(cep) {
      this.userData.userAddress.zipcode = this.numericOnly(cep);
      if (this.userData.userAddress.zipcode.length === 8) {
        document.querySelector('body').style.cursor = 'wait';
        fetch(`https://api.pagar.me/1/zipcodes/${cep}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            document.querySelector('body').style.cursor = 'auto';
            const state = uf.filter((uf) => uf.value === res.state)[0];
            this.userData.userAddress.city = res.city;
            this.userData.userAddress.zipcode = this.formatCEP(res.zipcode);
            this.userData.userAddress.street = res.street;
            this.userData.userAddress.state = state.label;
            this.userData.userAddress.neighborhood = res.neighborhood;
          });
      }
    },
    clearErrorToasty() {
      setTimeout(() => {
        this.status.show = false;
        this.status.message = null;
        this.status.code = null;
        this.status.title = null;
      }, 3000);
    },
    openToasty(show, message, status, title) {
      this.status.show = show;
      this.status.message = message;
      this.status.code = status;
      this.status.title = title;
      this.clearErrorToasty();
    },
  },
};
</script>

<style>
.drop-select a {
  cursor: pointer;
}
</style>
