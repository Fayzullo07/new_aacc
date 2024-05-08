import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_API;
const API = axios.create({ baseURL: URL });

// const config = {
//   headers: {
//     Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.access,
//   },
// };

// -----------------------------------------HERO-----------------------------
// GET
export const heroGetAPI = async () =>
    API.get(`/api/hero`);

// POST
export const heroPostAPI = async (data: any) =>
    API.post(`/api/hero`, data);

// PUT
export const heroPutAPI = async (data: any, id: any) =>
    API.put(`/api/hero/${id}/`, data);

// GET BY ID
export const heroGetOneAPI = async ({ id = "" }: { id: any }) =>
    API.get(`/api/hero/${id}/`);


// -----------------------------------------ABOUT-----------------------------
// GET
export const aboutGetAPI = async () =>
    API.get(`/api/about`);

// POST
export const aboutPostAPI = async (data: any) =>
    API.post(`/api/about`, data);

// PUT
export const aboutPutAPI = async (data: any, id: any) =>
    API.put(`/api/about/${id}/`, data);

// GET BY ID
export const aboutGetOneAPI = async ({ id = "" }: { id: any }) =>
    API.get(`/api/about/${id}/`);

// -----------------------------------------CENTER MIND-----------------------------
// POST
export const centerMindPostAPI = async (data: any) =>
    API.post(`/api/center_mind`, data);

// PUT
export const centerMindPutAPI = async (data: any, id: any) =>
    API.put(`/api/center_mind/${id}/`, data);

// PATCH
export const centerMindPatchAPI = async (data: any, id: any) =>
    API.patch(`/api/center_mind/${id}/`, data);


// GET ONE
export const centerMindGetOneAPI = async () =>
    API.get(`/api/center_mind`);

// -----------------------------------------ILMIY ETIKA-----------------------------
// POST
export const ilmiyEtikaPostAPI = async (data: any) =>
    API.post(`/api/ilmiy_etika`, data);

// PUT
export const ilmiyEtikaPutAPI = async (data: any, id: any) =>
    API.put(`/api/ilmiy_etika/${id}/`, data);

// PATCH
export const ilmiyEtikaPatchAPI = async (data: any, id: any) =>
    API.patch(`/api/ilmiy_etika/${id}/`, data);

// GET ONE
export const ilmiyEtikaGetOneAPI = async () =>
    API.get(`/api/ilmiy_etika`);


// -----------------------------------------NEWS-----------------------------
// GET
export const newsGetAPI = async ({ search = "" }) =>
    API.get(`/api/news/?search=${search}`);

// POST
export const newPostAPI = async (data: any) =>
    API.post(`/api/news`, data);

// PUT
export const newPutAPI = async (data: any, id: any) =>
    API.put(`/api/news/${id}/`, data);

// DELETE
export const newDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/news/${id}/`);

// GET BY ID
export const newGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/news/${id}/`);


// -----------------------------------------PROJECTS-----------------------------
// GET
export const projectGetAPI = async ({ search = "" }) =>
    API.get(`/api/projects/?search=${search}`);

// POST
export const projectPostAPI = async (data: any) =>
    API.post(`/api/projects`, data);

// PUT
export const projectPutAPI = async (data: any, id: any) =>
    API.put(`/api/projects/${id}/`, data);

// DELETE
export const projectDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/projects/${id}/`);

// GET BY ID
export const projectGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/projects/${id}/`);

// -----------------------------------------MEMBERS-----------------------------
// GET
export const membersGetAPI = async ({ search = "", legal = false }) =>
    API.get(`/api/member/?search=${search}&legal=${legal}`);

// POST
export const memberPostAPI = async (data: any) =>
    API.post(`/api/member`, data);

// PUT
export const memberPutAPI = async (data: any, id: any) =>
    API.put(`/api/member/${id}/`, data);

// DELETE
export const memberDeleteAPI = async (id: any, legal = false) =>
    API.delete(`/api/member/${id}/?legal=${legal}`);

// GET BY ID
export const memberGetOneAPI = async ({ id, legal }: { id: any, legal: any }) =>
    API.get(`/api/member/${id}/?legal=${legal}`);

// -----------------------------------------QUESTIONS-----------------------------
// GET
export const questiosGetAPI = async () =>
    API.get(`/api/question`);

// POST
export const questionPostAPI = async (data: any) =>
    API.post(`/api/question`, data);

// PUT
export const questionPutAPI = async (data: any, id: any) =>
    API.put(`/api/question/${id}/`, data);

// DELETE
export const questionDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/question/${id}/`);

// GET BY ID
export const questionGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/question/${id}/`);

// -----------------------------------------MESSAGES-----------------------------
// GET
export const messagesGetAPI = async ({ role }: { role: String }) =>
    API.get(`/api/messages/?role=${role}`);

// POST
export const messagePostAPI = async (data: any) =>
    API.post(`/api/messages`, data);

// GET BY ID
export const messagesGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/messages/${id}/`);

// DELETE
export const messageDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/messages/${id}/`);

// -----------------------------------------SERVICES-----------------------------
// GET
export const servicesGetAPI = async () =>
    API.get(`/api/service`);

// POST
export const servicePostAPI = async (data: any) =>
    API.post(`/api/service`, data);

// PUT
export const servicePutAPI = async (data: any, id: any) =>
    API.put(`/api/service/${id}/`, data);

// DELETE
export const serviceDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/service/${id}/`);

// GET BY ID
export const serviceGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/service/${id}/`);


// -----------------------------------------INITIATORS-----------------------------
// GET
export const initiatorsGetAPI = async ({ search = "" }) =>
    API.get(`/api/initiator/?search=${search}`);

// POST
export const initiatorPostAPI = async (data: any) =>
    API.post(`/api/initiator`, data);

// PUT
export const initiatorPutAPI = async (data: any, id: any) =>
    API.put(`/api/initiator/${id}/`, data);

// DELETE
export const initiatorDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/initiator/${id}/`);

// GET BY ID
export const initiatorGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/initiator/${id}/`);

// -----------------------------------------PARTNERS-----------------------------
// GET
export const partnersGetAPI = async ({ search = "" }) =>
    API.get(`/api/partner/?search=${search}`);

// POST
export const partnerPostAPI = async (data: any) =>
    API.post(`/api/partner`, data);

// PUT
export const partnerPutAPI = async (data: any, id: any) =>
    API.put(`/api/partner/${id}/`, data);

// DELETE
export const partnerDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/partner/${id}/`);

// GET BY ID
export const partnerGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/partner/${id}/`);


// -----------------------------------------EVENTS WAIT-----------------------------
// GET
export const eventsWaitdGetAPI = async ({ search = "" }) =>
    API.get(`/api/event/wait/?search=${search}`);

// POST
export const eventWaitPostAPI = async (data: any) =>
    API.post(`/api/event/wait`, data);

// PUT
export const eventWaitPutAPI = async (data: any, id: any) =>
    API.put(`/api/event/wait/${id}/`, data);

// PATCH
export const eventWaitPatchAPI = async (data: any, id: any) =>
    API.patch(`/api/event/wait/${id}/`, data);

// DELETE
export const eventWaitDeleteAPI = async ({ id }: { id: any }) =>
    API.delete(`/api/event/wait/${id}/`);

// GET BY ID
export const eventWaitGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/event/wait/${id}/`);

// -----------------------------------------EVENTS FINISHED-----------------------------
// GET
export const eventsFinishedGetAPI = async ({ search = "" }) =>
    API.get(`/api/event/finished/?search=${search}`);

// POST
export const eventFinishedPostAPI = async (data: any) =>
    API.post(`/api/event/finished`, data);

// PUT
export const eventFinishedPutAPI = async (data: any, id: any) =>
    API.put(`/api/event/finished/${id}/`, data);

// DELETE
export const eventFinishedDeleteAPI = async (id: any, idWait: any) => {
    return API.delete(`/api/event/finished/${id}/?idWait=${idWait}`);
}
// GET BY ID
export const eventFinishedGetOneAPI = async ({ id }: { id: any }) =>
    API.get(`/api/event/finished/${id}/`);