import myAxios from "./api";

// list of data fetches for contracts
const ContractService = {
    newContract: (body) => {
        return myAxios.post(`/contract/newContract`, body)
    },
    myRequest: () => {
        return myAxios.get("contract/myRequest")
    },
    requestedList: () => {
        return myAxios.get("contract/requestedList")
    },
    acceptRequest: (id, description) => {
        return myAxios.post(`contract/acceptRequest/${id}`, {description})
    },
    rejectedRequest: (id, reason) => {
        return myAxios.post(`contract/rejectedRequest/${id}`, {reason})
    },
    getRequestDetail(id) {
        return myAxios.get(`contract/${id}`)
    }
}

export default ContractService;
