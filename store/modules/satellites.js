import axios from '../../utils/axios'

export default {
  state: {
    satellites: [],
    satellite: {},
    name: 'Jane',
  },
  actions: {
    async fetchSats({ commit }, params = {}) {
      const {
        search = undefined,
        page = undefined,
        pageSize = undefined,
        sort = undefined,
        sortDirection = undefined,
      } = params

      try {
        const { data } = await axios.get('/api/tle', {
          params: {
            search,
            page,
            sort,
            'page-size': pageSize,
            'sort-dir': sortDirection,
          },
        })

        commit('satellites/satellites', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
