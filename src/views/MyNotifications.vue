<template>
  <div>
    <section class="s-perfil">
      <div class="container">
        <MenuLeftpProfile />
        <ContentProfile>
          <div class="title-area">
            <h3>Configure suas notificações</h3>
            <p>Para não perder nenhuma novidade, ative as suas notificações.</p>
          </div>

          <div class="box-content notifications">
            <div>
              <div class="item">
                <h6>receber notificações via:</h6>
                <label class="checkbox-custom"
                  >E-mail <strong> Receba as novidades por e-mail</strong>
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox-custom"
                  >Navegador <strong>Novidades direto no seu navegador</strong>
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="item">
                <h6>receber notificações de:</h6>
                <label class="checkbox-custom"
                  >Novos conteúdos
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox-custom"
                  >Sugestões de conteúdo
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox-custom"
                  >Novas conquistas
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <button class="btn-primary">Salvar alterações</button>
          </div>
        </ContentProfile>
      </div>
    </section>
  </div>
</template>
<script>
import MenuLeftpProfile from '@/components/MenuLeftpProfile';
import ContentProfile from '@/components/ContentProfile';
import http from '@/http';
export default {
  name: 'MyNotifications',
  components: {
    MenuLeftpProfile,
    ContentProfile,
  },
  created() {
    http.get('/notification').then((response) => {});
  },
};
</script>
<style></style>
