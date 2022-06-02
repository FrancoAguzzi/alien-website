import { finclubInitialStaticTopic } from '@/Utils/selectsValues';

const BASE_URL = `https://community.timeprimo.com/${process.env.VUE_APP_STAGE}`;
const SERVICE_NAME = 'finclass';

const state = {
  topicsPerFetch: 10,
  hasMoreTopics: true,
  topicsPage: 1,
  topicsList: [],
  topicTags: [],
  topicsError: false,
  toastStatus: {
    code: 0,
    message: '',
  },
  interfaceOpen: false,
  currentExpandedTopic: {},
  userActivities: [],
  reactedTopics: [],
};
const getters = {
  getTopicsPage: (state) => state.topicsPage,
  getTopicsPerFetch: (state) => state.topicsPerFetch,
  getTopicsList: (state) => state.topicsList,
  getTopicTags: (state) => state.topicTags,
  getTopicsError: (state) => state.topicsError,
  hasMoreTopics: (state) => state.hasMoreTopics,
  getToastStatus: (state) => state.toastStatus,
  hasInterfaceOpen: (state) => state.interfaceOpen,
  getCurrentExpandedTopic: (state) => state.currentExpandedTopic,
  getUserActivities: (state) => state.userActivities,
  getReactedTopics: (state) => state.reactedTopics,
};
const mutations = {
  TOGGLE_LOADING_TOPICS(state) {
    state.loadingTopics = !state.loadingTopics;
  },
  TOGGLE_HAS_INTERFACE_OPEN(state, newVal) {
    if (typeof newVal === 'boolean') {
      state.interfaceOpen = newVal;
    } else {
      state.interfaceOpen = !state.interfaceOpen;
    }
  },
  RESET_TOPICS_PAGE(state) {
    state.topicsPage = 1;
  },
  INCREASE_TOPICS_PAGE(state) {
    state.topicsPage++;
  },
  SET_TOPICS_LIST(state, newVal) {
    state.topicsList = newVal;
  },
  SET_TOPIC_TAGS(state, newVal) {
    state.topicTags = newVal;
  },
  SET_TOPICS_ERROR(state, newVal) {
    state.topicsError = newVal;
  },
  SET_HAS_MORE_TOPICS(state, newVal) {
    state.hasMoreTopics = newVal;
  },
  SET_TOAST_STATUS(state, newVal) {
    state.toastStatus = newVal;
    window.setTimeout(() => {
      state.toastStatus = '';
    }, 5000);
  },
  SET_CURRENT_EXPANDED_TOPIC(state, newVal) {
    state.currentExpandedTopic = newVal;
  },
  SET_USER_ACTIVITIES(state, newVal) {
    state.userActivities = newVal;
  },
  SET_REACTED_TOPICS(state, newVal) {
    state.reactedTopics = newVal;
  },
};
const actions = {
  initializeFinclubStore({ commit, getters, dispatch }) {
    commit('SET_TOPICS_LIST', []);
    commit('SET_TOPIC_TAGS', []);
    commit('SET_REACTED_TOPICS', []);
    commit('SET_TOPICS_ERROR', false);
    commit('RESET_TOPICS_PAGE');
    commit('SET_CURRENT_EXPANDED_TOPIC', {});
    dispatch('fetchUserActivities').then(() => dispatch('buildUserReactionsArray'));

    const statusObj = {
      code: 0,
      message: '',
    };
    commit('SET_TOAST_STATUS', statusObj);

    if (getters.hasInterfaceOpen) {
      commit('TOGGLE_HAS_INTERFACE_OPEN');
    }
  },
  checkIfHasMoreTopics({ commit, getters }) {
    const startIndex = getters.getTopicsPage * getters.getTopicsPerFetch;
    const hasMore =
      getters.getTopicsList.length === 0 || startIndex <= getters.getTopicsList.length;
    commit('SET_HAS_MORE_TOPICS', hasMore);
  },
  fetchTopic({ commit, rootState }, topicID) {
    return new Promise((resolve, reject) => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${rootState.token}`);
      myHeaders.append('Service', SERVICE_NAME);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}/topics/${topicID}`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetchTopics({ commit, getters, dispatch, rootState }, payload = {}) {
    return new Promise((resolve, reject) => {
      const { fromFirst = false, tagFilter = '', resetPage = false } = payload;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${rootState.token}`);
      myHeaders.append('Service', SERVICE_NAME);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      if (fromFirst || resetPage) commit('RESET_TOPICS_PAGE');

      fetch(
        `${BASE_URL}/topics?page=${getters.getTopicsPage}&perPage=${getters.getTopicsPerFetch}${
          tagFilter ? `&tagID=${tagFilter}` : ''
        }`,
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          if (fromFirst) {
            commit('SET_TOPICS_LIST', [
              res.data[0],
              ...getters.getTopicsList.filter((el) => el.topicID !== res.data[0].topicID),
            ]);
          } else if (resetPage) {
            commit('SET_TOPICS_LIST', [...res.data]);
          } else {
            commit('SET_TOPICS_LIST', [...getters.getTopicsList, ...res.data]);
          }
          dispatch('checkIfHasMoreTopics');
          if (!getters.hasMoreTopics) {
            commit('SET_TOPICS_LIST', [...getters.getTopicsList, finclubInitialStaticTopic]);
          }
          commit('INCREASE_TOPICS_PAGE');
          resolve(res.data);
        })
        .catch((err) => {
          commit('SET_TOPICS_ERROR', !!err);
          reject(err);
        });
    });
  },
  fetchTopicTags({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${rootState.token}`);
      myHeaders.append('Service', SERVICE_NAME);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}/tags?page=1&perPage=99999`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          commit('SET_TOPIC_TAGS', [...res.data]);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  reactToPublish({ commit, getters, rootState }, payload) {
    return new Promise((resolve, reject) => {
      const { id, reaction, isComment = false, topicId, commentId } = payload;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${rootState.token}`);
      myHeaders.append('Service', SERVICE_NAME);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      let updatedTopics, updatedReactions;
      const reactionNameWithoutMinus = reaction.substring(1);
      const reactedTopicInfo = {
        id: id,
        reaction: reaction.includes('-') ? '' : reaction,
      };

      // Reaction to first level comments
      if (isComment) {
        const reactedCommentTopic = getters.getTopicsList.find((el) => el.topicID === topicId);
        let reactedComment;

        // Reaction to second level comments
        if (commentId) {
          const reactedCommentComment = reactedCommentTopic.topicReplys.find(
            (comment) => comment.commentID === commentId
          );

          reactedComment = reactedCommentComment.commentReplys.find(
            (nested) => nested.commentID === id
          );
        } else {
          reactedComment = reactedCommentTopic.topicReplys.find(
            (comment) => comment.commentID === id
          );
        }
        if (reaction.includes('-')) {
          reactedComment.commentReacts[reactionNameWithoutMinus]--;
          updatedReactions = [...getters.getReactedTopics.filter((el) => el.id !== id)];
        } else {
          updatedReactions = [...getters.getReactedTopics, reactedTopicInfo];
          reactedComment.commentReacts[reaction]++;
        }

        const reactedTopicUpdated = [...reactedCommentTopic.topicReplys, reactedComment];

        const reactedTopicIndex = getters.getTopicsList.findIndex(
          (el) => el.topicID === reactedTopicUpdated.topicID
        );

        updatedTopics = [
          ...getters.getTopicsList.filter((el) => el.topicID !== reactedTopicUpdated.topicID),
        ];

        updatedTopics.splice(reactedTopicIndex, 0, reactedTopicUpdated);
      } else {
        // Reaction to topics
        const reactedTopic = getters.getTopicsList.find((el) => el.topicID === id);

        if (reaction.includes('-')) {
          reactedTopic.topicReacts[reactionNameWithoutMinus]--;

          updatedReactions = [...getters.getReactedTopics.filter((el) => el.id !== id)];
        } else {
          updatedReactions = [...getters.getReactedTopics, reactedTopicInfo];
          reactedTopic.topicReacts[reaction]++;
        }

        const reactedTopicIndex = getters.getTopicsList.findIndex(
          (el) => el.topicID === reactedTopic.topicID
        );

        updatedTopics = [
          ...getters.getTopicsList.filter((el) => el.topicID !== reactedTopic.topicID),
        ];

        updatedTopics.splice(reactedTopicIndex, 0, reactedTopic);
      }

      const updatedTopicReactionIsExpanded =
        getters.getCurrentExpandedTopic?.topicID === topicId ||
        getters.getCurrentExpandedTopic?.topicID === id;

      if (updatedTopicReactionIsExpanded) {
        commit(
          'SET_CURRENT_EXPANDED_TOPIC',
          updatedTopics.find((el) => el.topicID === getters.getCurrentExpandedTopic?.topicID)
        );
      }

      commit('SET_TOPICS_LIST', updatedTopics);
      commit('SET_REACTED_TOPICS', updatedReactions);

      fetch(
        `${BASE_URL}/reacts/${isComment ? 'comment' : 'topic'}/${id}/create?reactKind=${reaction}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetchUserActivities({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${rootState.token}`);
      myHeaders.append('Service', SERVICE_NAME);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}/users/activity`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          commit('SET_USER_ACTIVITIES', res.data?.activity);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  buildUserReactionsArray({ commit, getters }) {
    if (getters.getUserActivities?.length) {
      const userReactedTopics = getters.getUserActivities
        .filter((act) => {
          return (
            act.activityAction.includes('topic:react') ||
            act.activityAction.includes('comment:react')
          );
        })
        .map((reaction) => {
          const obj = {
            id: reaction.topicID || reaction.commentID,
            reaction: reaction.activityAction.split(':')[2].toUpperCase(),
          };
          return obj;
        });
      commit('SET_REACTED_TOPICS', userReactedTopics);
    }
  },
  publishComment({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${rootState.token}`);
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Service', SERVICE_NAME);

      const raw = JSON.stringify({
        commentBody: payload.commentBody,
        referenceID: payload.id,
        referenceKind: payload.kind,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}/comments`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            const statusObj = {
              code: 200,
              message: 'Seu comentário já está disponível.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          } else {
            const statusObj = {
              code: 500,
              message: 'Não foi possível postar seu comentário.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          }
          resolve(res.data);
        })
        .catch((err) => {
          if (!window.navigator.onLine) {
            const statusObj = {
              code: 400,
              message: 'Sem conexão com a internet.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          } else {
            const statusObj = {
              code: 500,
              message: 'Não foi possível postar seu comentário.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          }
          reject(err);
        });
    });
  },
  publishTopic({ commit, dispatch, rootState }, payload) {
    return new Promise((resolve, reject) => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${rootState.token}`);
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Service', SERVICE_NAME);

      const raw = JSON.stringify({
        topicBody: payload.topicBody,
        tagsRelated: payload.topicTags,
        topicKind: 'text',
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}/topics`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            const statusObj = {
              code: 200,
              message: 'Sua publicação já está disponível.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          } else {
            const statusObj = {
              code: 500,
              message: 'Não foi possível postar sua publicação.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          }
          dispatch('fetchTopics', { fromFirst: true });
          resolve(res.data);
        })
        .catch((err) => {
          if (!window.navigator.onLine) {
            const statusObj = {
              code: 400,
              message: 'Sem conexão com a internet.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          } else {
            const statusObj = {
              code: 500,
              message: 'Não foi possível postar sua publicação.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          }
          reject(err);
        });
    });
  },
  deleteTopic({ commit, getters, rootState }, payload) {
    return new Promise((resolve, reject) => {
      const { isComment, id } = payload;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${rootState.token}`);
      myHeaders.append('Service', SERVICE_NAME);

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}/${isComment ? 'comments' : 'topics'}/${id}`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          const topicsWithoutDeletedOne = getters.getTopicsList.filter((el) => el.topicID !== id);
          commit('SET_TOPICS_LIST', [...topicsWithoutDeletedOne]);

          const statusObj = {
            code: 200,
            message: isComment
              ? 'Comentário excluído permanentemente.'
              : 'Publicação excluída permanentemente.',
          };
          commit('SET_TOAST_STATUS', statusObj);
          resolve(res.data);
        })
        .catch((err) => {
          if (!window.navigator.onLine) {
            const statusObj = {
              code: 400,
              message: 'Sem conexão com a internet.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          } else {
            const statusObj = {
              code: 500,
              message: 'Não foi possível completar a ação.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          }
          reject(err);
        });
    });
  },
  denounceTopic({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      const { isComment, id, motive, details } = payload;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${rootState.token}`);
      myHeaders.append('Service', SERVICE_NAME);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        `${BASE_URL}/reports/${
          isComment ? 'comment' : 'topic'
        }/${id}/create?reportMotive=${motive}&reportDetails=${details}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          const statusObj = {
            code: 200,
            message: isComment
              ? 'Comentário denunciado com sucesso.'
              : 'Publicação denunciada com sucesso.',
          };
          commit('SET_TOAST_STATUS', statusObj);
          resolve(res.data);
        })
        .catch((err) => {
          if (!window.navigator.onLine) {
            const statusObj = {
              code: 400,
              message: 'Sem conexão com a internet.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          } else {
            const statusObj = {
              code: 500,
              message: 'Não foi possível completar a ação.',
            };
            commit('SET_TOAST_STATUS', statusObj);
          }
          reject(err);
        });
    });
  },
  closeClubToast({ commit }) {
    const statusObj = {
      code: 0,
      message: '',
    };
    commit('SET_TOAST_STATUS', statusObj);
  },
  toggleHasInterfaceOpen({ commit }, show = undefined) {
    commit('TOGGLE_HAS_INTERFACE_OPEN', show);
  },
  updateCurrentExpandedTopic({ commit }, newVal) {
    commit('SET_CURRENT_EXPANDED_TOPIC', newVal);
  },
};

export default { state, getters, mutations, actions };
