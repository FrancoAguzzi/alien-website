<template>
  <footer class="desktop">
    <div class="container">
      <ul class="nav">
        <li>
          <div class="logo">
            <!-- <img src="@/assets/img/logo-color.svg" alt="Finclass Educação financeira" /> -->
          </div>
          <div class="slogan-sep">
              <!-- src="@/assets/img/extensive-footer/separator-foot.svg" -->
            <img
              rel="preload"
              class="sociais"
              alt="Instagram"
            />
            <p>Aprenda finanças com os melhores do mundo.</p>
          </div>
        </li>
        <li>
          <strong>Transparência</strong>
          <a href="https://app.finclass.com/privacy-policy/1" rel="noopener">
            Termos de uso
          </a>
          <a href="https://app.finclass.com/privacy-policy/7" rel="noopener">
            Política de Privacidade
          </a>
          <a href="https://privacy.finclass.com/_f/" rel="noopener" target="_blank">
            Proteja sua privacidade
          </a>
        </li>
        <li>
          <strong>Fale conosco</strong>
          <a href="mailto:suporte@finclass.com">Contato</a>
        </li>
        <li>
          <p>2022 © Todos os direitos reservados. <strong>Finclass</strong></p>
        </li>
        <li>
          <strong>Redes sociais</strong>
          <a href="https://www.instagram.com/finclass_grupoprimo/" rel="noopener">
              <!-- src="@/assets/img/extensive-footer/Vector_4.svg" -->
            <img
              rel="preload"
              class="sociais"
              alt="Instagram"
            />
            Instagram
          </a>
          <a href="https://www.youtube.com/channel/UCeOEK9nZbdAw65WxPbXOZ0w" rel="noopener">
              <!-- src="@/assets/img/extensive-footer/Vector_3.svg" -->
            <img
              rel="preload"
              class="sociais"
              alt="Youtube"
            />
            Youtube
          </a>
        </li>
        <li class="stores">
          <strong>Baixe nosso app</strong>
          <a href="https://apps.apple.com/us/app/finclass/id1575280028" rel="noopener">
              <!-- src="@/assets/img/extensive-footer/apple_footer.svg" -->
            <img
              rel="preload"
              class="str"
              alt="Apple Store"
            />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.finclass.app" rel="noopener">
              <!-- src="@/assets/img/extensive-footer/google_footer.svg" -->
            <img
              rel="preload"
              class="str"
              alt="Google Store"
            />
          </a>
        </li>
      </ul>
      <hr />
      <div class="feet">
        <p>2022 © Todos os direitos reservados. <strong>Finclass</strong></p>
        <p class="back" @click="backTop">
          Voltar para o topo
          <!-- <img src="@/assets/img/arrow-circle-down.svg" alt="voltar ao topo" /> -->
        </p>
      </div>
    </div>
  </footer>

  <footer class="mobile">
    <div class="container">
      <div class="back-top">
        <button class="back" @click="backTop">
          Voltar para o topo
          <!-- <img src="@/assets/img/arrow-circle-down.svg" alt="voltar ao topo" /> -->
        </button>
      </div>
      <div class="logo">
        <!-- <img src="@/assets/img/logo-color.svg" alt="Finclass Educação financeira" /> -->
      </div>
      <div class="wrap-scroll">
        <div class="menu-content">
          <ul>
            <li class="footer-accordiion" @click="toggleAccordion('first')">
              <strong :class="{ open: isFirstOrderExpanded }">
                Transparência
                  <!-- src="@/assets/img/arrow-down-outline.svg" -->
                <img
                  rel="preload"
                  alt="Open close footer"
                />
              </strong>
              <div class="wrap-content" :class="{ open: isFirstOrderExpanded }">
                <a href="https://app.finclass.com/privacy-policy/1" rel="noopener">
                  Termos de uso
                </a>
                <a href="https://app.finclass.com/privacy-policy/7" rel="noopener">
                  Política de Privacidade
                </a>
                <a href="https://privacy.finclass.com/_f/" target="_blank" rel="noopener">
                  Proteja sua privacidade
                </a>
              </div>
                <!-- src="@/assets/img/extensive-footer/separador.svg" -->
              <img
                rel="preload"
                alt="Google Store"
              />
            </li>
            <li class="footer-accordiion" @click="toggleAccordion('second')">
              <strong :class="{ open: isSecondOrderExpanded }">
                Fale conosco
                  <!-- src="@/assets/img/arrow-down-outline.svg" -->
                <img
                  rel="preload"
                  alt="Open close footer"
                />
              </strong>
              <div class="wrap-content" :class="{ open: isSecondOrderExpanded }">
                <a href="mailto:suporte@finclass.com">Contato</a>
              </div>
                <!-- src="@/assets/img/extensive-footer/separador.svg" -->
              <img
                rel="preload"
                alt="Google Store"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="store-logo">
        <a href="https://apps.apple.com/us/app/finclass/id1575280028" rel="noopener">
            <!-- src="@/assets/img/extensive-footer/apple_footer.svg" -->
          <img
            rel="preload"
            alt="Apple Store"
          />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.finclass.app" rel="noopener">
            <!-- src="@/assets/img/extensive-footer/google_footer.svg" -->
          <img
            rel="preload"
            alt="Google Store"
          />
        </a>
      </div>
      <div class="sociais">
        <a href="https://www.instagram.com/finclass_grupoprimo/" rel="noopener">
            <!-- src="@/assets/img/extensive-footer/Vector_4.svg" -->
          <img
            rel="preload"
            class="lazyload sociais"
            alt="Instagram"
          />
        </a>
        <a href="https://www.youtube.com/channel/UCeOEK9nZbdAw65WxPbXOZ0w" rel="noopener">
            <!-- src="@/assets/img/extensive-footer/Vector_3.svg" -->
          <img
            rel="preload"
            class="lazyload sociais"
            alt="Youtube"
          />
        </a>
      </div>
      <div class="text-content">
        <p>
          2022 © Todos os direitos reservados. Finclass
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ExtensiveFooter',
  data() {
    return {
      mobileAccordion: [],
    };
  },
  computed: {
    isFirstOrderExpanded() {
      return this.mobileAccordion.includes('first');
    },
    isSecondOrderExpanded() {
      return this.mobileAccordion.includes('second');
    },
  },
  methods: {
    backTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    toggleAccordion(order) {
      const orderIndex = this.mobileAccordion.findIndex((o) => o === order);
      if (orderIndex >= 0) {
        this.mobileAccordion.splice(orderIndex, 1);
      } else {
        this.mobileAccordion.push(order);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

footer {
  width: 112%;
  margin-top: 7rem;

  &.desktop {
    display: unset;
  }
  &.mobile {
    display: none;
  }
  .container {
    width: 1280px;
    margin: auto;
    .nav {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 40px;
      li {
        &:nth-child(4) {
          display: none;
        }
        &:first-child {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
            margin-bottom: 24px;
            font-size: 16px;
            line-height: 23px;
          }
        }
        &:last-child {
          a {
            img {
              width: 160px;
              height: 48px;
              &:hover {
                background-color: $dark-900;
              }
            }
          }
        }
        .logo {
          img {
            width: 167px;
            height: 28px;
          }
        }
        .slogan-sep {
          img {
            margin-bottom: 24px;
            width: 42px;
          }
        }
        strong {
          display: block;
          font-size: 18px;
          line-height: 20px;
        }
        a {
          display: block;
          text-decoration: none;
          color: $white;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          margin: 24px 0;
          display: flex;
          align-items: center;
          img {
            &.sociais {
              width: 20px;
              margin-right: 12px;
            }
          }
        }
      }
      .stores {
        a {
          margin-right: 32px;
          display: block;
          padding: 10px 30px;
          margin-right: 15px;
          border: 1px solid $white;
          border-radius: 6px;
          text-align: center;
          width: fit-content;
          .str {
            width: 120px;
            height: auto;
            background-color: transparent;
            &:hover {
              border-radius: 6px;
              transition: all ease-in-out 0.3s;
              background-color: transparent;
            }
          }
          &:hover {
            border-radius: 6px;
            transition: all ease-in-out 0.3s;
            background-color: $dark-900;
          }
        }
      }
    }
    hr {
      border-top: 1px solid $dark-700;
      margin-top: 65px;
    }
    .feet {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px 0;
      .back {
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          margin-left: 21px;
          transform: rotate(180deg);
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1279px) {
    margin: 5rem 0 0;
    padding: 48px 0 0 0;
    &.desktop {
      display: unset;
    }
    &.mobile {
      display: none;
    }
    .container {
      width: 100%;
      margin: auto;
      padding: 0 40px;
      .nav {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 88px;
        li {
          &:nth-child(4) {
            display: flex;
            align-items: flex-start;
          }
          &:nth-child(6) {
            a {
              display: block;
              padding: 10px 20px;
              margin-right: 15px;
              border: 1px solid $white;
              border-radius: 6px;
              text-align: center;
              width: 90%;
            }
          }
          &:first-child {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
              margin-bottom: 24px;
              font-size: 16px;
              line-height: 23px;
            }
          }
          &:last-child {
            a {
              img {
                width: 160px;
                height: 48px;
                &:hover {
                  background-color: $dark-900;
                }
              }
            }
          }
          .logo {
            img {
              width: 167px;
              height: 28px;
            }
          }
          .slogan-sep {
            img {
              margin-bottom: 24px;
              width: 42px;
            }
          }
          strong {
            display: block;
            font-size: 18px;
            line-height: 20px;
          }
          a {
            display: block;
            text-decoration: none;
            color: $white;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            margin: 24px 0;
            display: flex;
            align-items: center;
            img {
              &.sociais {
                width: 20px;
                height: 20px;
                margin-right: 12px;
              }
            }
          }
        }
      }
      hr {
        border-top: 1px solid $dark-700;
        margin-top: 65px;
      }
      .feet {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 32px 0;
        p {
          &:first-child {
            visibility: hidden;
          }
        }
        .back {
          display: flex;
          align-items: center;
          cursor: pointer;
          img {
            margin-left: 21px;
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    &.desktop {
      display: none;
    }
    &.mobile {
      display: unset;
    }
    margin: 76px 0 0;
    background-color: $dark-800;
    padding: 0px 0 0 0;
    border: 1px solid transparent;
    .container {
      width: 100%;
      margin: auto;
      padding: 20px;
      .back-top {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        button {
          background-color: transparent;
          color: $white;
          font-size: 16px;
          line-height: 18px;
          display: flex;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
            margin-left: 21px;
            transform: rotate(180deg);
          }
        }
      }
      .logo {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-top: 3rem;
        img {
          width: 145px;
          height: 24px;
        }
      }
      .wrap-scroll {
        display: flex;
        width: 100%;
        margin-top: 50px;
        .menu-content {
          width: 100%;
          overflow-y: scroll;
          max-height: 220px;
          &::-webkit-scrollbar {
            width: 5px;
          }

          /* Track */
          &::-webkit-scrollbar-track {
            background: transparent;
          }

          /* Handle */
          &::-webkit-scrollbar-thumb {
            background: transparent;
          }
          ul {
            .footer-accordiion {
              cursor: pointer;
              strong {
                display: flex;
                font-size: 18px;
                line-height: 20px;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                &.open {
                  transition: all ease 0.3s;
                  img {
                    transform: rotate(180deg);
                  }
                }
                img {
                  width: 20px;
                  height: 20px;
                  margin: 0px;
                }
              }
              img {
                width: 100%;
                margin: 8px auto 24px 0;
              }
              .wrap-content {
                height: 0;
                overflow-y: hidden;
                transition: all ease 0.5s;
                &.open {
                  height: 100px;
                }
                a {
                  display: block;
                  color: $white;
                  text-decoration: none;
                  font-size: 14px;
                  line-height: 19px;
                  margin: 12px 0px;
                }
              }
            }
          }
        }
        .btns {
          display: flex;
          flex-direction: column;
          height: 100%;
          align-items: center;
          justify-content: space-between;
          button {
            background-color: transparent;
            &:first-child {
              transform: rotate(180deg);
            }
          }
        }
      }
      .store-logo {
        width: 100%;
        margin-top: 32px;
        display: flex;
        a {
          display: block;
          padding: 10px 20px;
          margin: 0 7.5px;
          border: 1px solid $white;
          border-radius: 6px;
          text-align: center;
          width: 100%;
          img {
            width: 90px;
          }
          &:hover {
            border-radius: 6px;
            transition: all ease-in-out 0.3s;
            background-color: $dark-900;
          }
        }
      }
      .sociais {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        a {
          margin: 0 17px;
        }
      }
      .text-content {
        margin: 44px 0;
        p {
          text-align: center;
          font-size: 16px;
          line-height: 24px;
          display: block;
          width: 186px;
          margin: auto;
        }
      }
    }
  }
}
</style>
