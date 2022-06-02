<template>
  <div class="chatMessage">
    <img
      v-if="message.hasOwnProperty('avatar') && message.avatar"
      :src="message.avatar.includes('http') ? message.avatar : `https://${message.avatar}`"
      alt="Ícone do Usuário"
      class="chatMessage_avatar"
    />
    <div v-else class="chatMessage_avatar chatMessage_letter">{{ usernameFirstLetter }}</div>

    <div class="chatMessage_content">
      <h6 class="chatMessage_content-author">{{ message.author }}</h6>
      <p class="chatMessage_content-text">{{ message.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      default() {
        return { created_at: '', id: '', text: '', avatar: '', author: '' };
      },
    },
  },
  computed: {
    usernameFirstLetter() {
      return this.message?.author.charAt(0) || 'X';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.chatMessage {
  padding: 10px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
}

.chatMessage_avatar {
  min-width: 24px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.chatMessage_letter {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  background-color: $white;
  color: $dark-900;
}

.chatMessage_content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.chatMessage_content-author {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 140%;
  color: $white;
}

.chatMessage_content-text {
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 140%;
  color: $white;
  opacity: 0.8;
  max-width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
