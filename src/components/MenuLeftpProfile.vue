<template>
  <div class="left-container">
    <h2>
      <!-- <img src="@/assets/img/icon-perfil.svg" alt="" />  -->
      Meu perfil</h2>
    <div class="line"></div>
    <ul class="gtm-internal-menu">
      <li :class="currentPath === '/my-profile/profile' ? 'active' : ''">
        <router-link to="/my-profile/profile">
          <div class="icon">
            <!-- <img src="@/assets/img/icon-profile.svg" alt="" /> -->
          </div>
          <span>Meu ID</span>
        </router-link>
      </li>
      <li :class="currentPath === '/my-profile/personal-data' ? 'active' : ''">
        <router-link to="/my-profile/personal-data">
          <div class="icon">
            <!-- <img src="@/assets/img/icon-dados-pessoais.svg" alt="" /> -->
          </div>
          <span>Dados pessoais</span>
        </router-link>
      </li>
      <li :class="currentPath === '/my-profile/my-signature' ? 'active' : ''">
        <router-link to="/my-profile/my-signature" id="menu-signature">
          <div class="icon">
            <!-- <img src="@/assets/img/icon-assinatura.svg" alt="" /> -->
          </div>
          <span>
            Assinatura
            <PointWarning />
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import PointWarning from '@/components/PointWarning';

export default {
  components: { PointWarning },
  data() {
    return {
      currentPath: this.$route.path,
    };
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';

.s-perfil {
  .left-container {
    position: sticky;
    top: 0;

    h2 {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        margin-right: 24px;
      }
    }

    .line {
      width: 40px;
      border-top: 2px solid #00e7f9;
      margin-top: 4.5rem;
      margin-bottom: 3.5rem;
    }

    ul {
      li {
        &.active,
        &:hover {
          a {
            opacity: 1;
            .icon {
              filter: grayscale(0%);
            }
          }
        }
        a {
          border-bottom: 2px solid #202227;
          padding: 2rem 0px;
          display: flex;
          align-items: center;
          opacity: 0.7;
          .icon {
            width: 24px;
            margin-right: 1rem;
            filter: grayscale(100%);
          }
          span {
            position: relative;
            font-weight: 600;
            color: #ffffff;
            font-size: 18px;

            > .pointWarning {
              right: -15px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1000px) {
    .left-container {
      display: none;
    }
  }
}
</style>
