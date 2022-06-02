import { JSEncrypt } from 'jsencrypt';
export const encrypt = {
  methods: {
    encryptedData(publicKey, data) {
      let encryptor = new JSEncrypt();
      encryptor.setPublicKey(publicKey);
      return encryptor.encrypt(JSON.stringify(data));
    },
    decryptData(privateKey, data) {
      let decrypt = new JSEncrypt();
      decrypt.setPrivateKey(privateKey);
      decrypt.decrypt(secretWord);
    },
  },
};
