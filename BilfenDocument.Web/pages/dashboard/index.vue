<style>
@import url("~/assets/css/style.css");
</style>

<template>
  <div class="sidebar p-3">
    <img src="~/assets/img/logo.jpg" width="100%" />
    <h6 class="bg-white text-center" style="height: 25px">
      İşe Giriş Evrak Takip Sistemi
    </h6>
    <ul class="nav flex-column">
      <li class="nav-item mb-2" v-if="roleName == 'ADMIN'">
        <a
          ref="btnUser"
          class="nav-link active text-white"
          @click="btnUsersClick"
          style="cursor: pointer"
          >Kullanıcılar</a
        >
      </li>
      <li class="nav-item mb-2" v-if="roleName == 'ADMIN'">
        <a
          ref="btnRole"
          class="nav-link text-white"
          @click="btnRolesClick"
          style="cursor: pointer"
          >Roller</a
        >
      </li>
      <li class="nav-item mb-2" v-if="roleName == 'USER'">
        <a
          class="nav-link active text-white"
          @click="btnLoadDocumentClick"
          style="cursor: pointer"
          >Evrak Yükleme ve Takip</a
        >
      </li>
      <li class="nav-item" v-if="roleName == 'HR'">
        <a class="nav-link active text-white" href="#"
          >Evrak Onay ve Reddetme</a
        >
      </li>
    </ul>
  </div>

  <nav class="content navbar justify-content-between">
    <a class="navbar-brand text-white" style="margin-left: 15px"
      >Merhaba, {{ userFullName }}</a
    >
    <a class="btn text-white border" style="margin-right: 15px" @click="logout">
      Oturumu Kapat
      <font-awesome-icon icon="fa-sign-out-alt" />
    </a>
  </nav>

  <div class="content p-3 pb-0">
    <div id="divUser" ref="divUser">
      <h4>Kullanıcılar</h4>
      <hr />
      <form @submit.prevent="UserSubmit" method="post">
        <FormHeader
          @record-list-click="btnRecordListClick"
          @delete-click="btnDeleteClick"
          @reset-click="btnResetClick"
        ></FormHeader>

        <div class="border p-3">
          <div class="row mb-3">
            <div class="col-2">
              <label class="form-label">Oluşturulma Tarihi</label>
            </div>

            <div class="col-4">
              <p>{{ UserCreatedAt }}</p>
            </div>

            <div class="col-2">
              <label class="form-label">Son Güncelleme Tarihi</label>
            </div>

            <div class="col-4">
              <p>{{ UserUpdatedAt }}</p>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
              <label for="firstName" class="form-label"
                >Adı <span class="star">*</span></label
              >
            </div>

            <div class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
              <input
                type="text"
                id="firstName"
                ref="firstName"
                class="form-control"
                v-model="FirstName"
                placeholder="Kullanıcı isim bilgisini giriniz"
              />
              <span v-if="vUser$.FirstName.$error" class="error"
                >Adı bilgisi zorunludur.</span
              >
            </div>

            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
              <label for="lastName" class="form-label"
                >Soyadı <span class="star">*</span></label
              >
            </div>

            <div class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
              <input
                type="text"
                id="lastName"
                ref="lastName"
                class="form-control"
                v-model="LastName"
                placeholder="Kullanıcı soyisim bilgisini giriniz"
              />

              <span v-if="vUser$.LastName.$error" class="error"
                >Soyadı bilgisi zorunludur.</span
              >
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
              <label for="userName" class="form-label"
                >Kullanıcı Adı <span class="star">*</span></label
              >
            </div>

            <div class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
              <input
                type="text"
                id="userName"
                ref="userName"
                class="form-control"
                v-model="UserName"
                placeholder="Kullanıcı adı bilgisini giriniz"
              />

              <span v-if="vUser$.UserName.$error" class="error"
                >Kullanıcı Adı bilgisi zorunludur.</span
              >
            </div>

            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
              <label for="email" class="form-label"
                >Email <span class="star">*</span></label
              >
            </div>

            <div class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
              <input
                type="email"
                id="email"
                ref="email"
                class="form-control"
                v-model="Email"
                placeholder="Kullanıcı email bilgisini giriniz"
              />

              <span v-if="vUser$.Email.$error" class="error"
                >Email bilgisi zorunludur.</span
              >
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
              <label for="password" class="form-label"
                >Parola <span class="star">*</span></label
              >
            </div>

            <div class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
              <input
                type="password"
                id="password"
                ref="password"
                class="form-control"
                v-model="Password"
                placeholder="Kullanıcı parola bilgisini giriniz"
              />

              <span v-if="vUser$.Password.$error" class="error"
                >Parola bilgisi zorunludur.</span
              >
            </div>

            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
              <label for="role" class="form-label"
                >Rol <span class="star">*</span></label
              >
            </div>

            <div class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
              <select
                ref="roleSelect"
                id="role"
                class="form-select form-control"
                aria-label="Default select example"
                v-model="selectedRole"
              >
                <option
                  v-for="role in allRoles.data"
                  :key="role.Id"
                  :value="role.Id"
                >
                  {{ role.Name }}
                </option>
              </select>

              <span v-if="vUser$.selectedRole.$error" class="error"
                >Rol bilgisi zorunludur.</span
              >
            </div>
          </div>
        </div>
      </form>
    </div>

    <div id="divRole" ref="divRole" style="display: none">
      <div class="d-flex justify-content-between">
        <h4>Roller</h4>
        <a class="btn" @click="btnRoleRecordInsert"
          ><font-awesome-icon
            icon="fa-plus"
            style="width: 20px; height: 20px"
          ></font-awesome-icon
        ></a>
      </div>
      <hr />
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Rol Adı</th>
            <th>Oluşturulma Tarihi</th>
            <th>Son Güncelleme Tarihi</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="role in paginatedRoleData.paginatedData.value">
          <tr>
            <td>{{ role.Id }}</td>
            <td>{{ role.Name }}</td>
            <td>{{ role.createdAt }}</td>
            <td>{{ role.updatedAt }}</td>
            <td>
              <a
                :class="[
                  'btn',
                  {
                    'btn-dark':
                      role.Name === 'ADMIN' ||
                      role.Name === 'HR' ||
                      role.Name === 'USER',
                  },
                  {
                    'btn-primary':
                      role.Name != 'ADMIN' ||
                      role.Name != 'HR' ||
                      role.Name != 'USER',
                  },
                  'me-2',
                  {
                    disabled:
                      role.Name == 'ADMIN' ||
                      role.Name == 'HR' ||
                      role.Name == 'USER',
                  },
                ]"
                @click="btnRoleRecordUpdate(role.Id)"
                >Güncelle</a
              >
              <a
                :class="[
                  'btn',
                  {
                    'btn-dark':
                      role.Name === 'ADMIN' ||
                      role.Name === 'HR' ||
                      role.Name === 'USER',
                  },
                  {
                    'btn-danger':
                      role.Name != 'ADMIN' ||
                      role.Name != 'HR' ||
                      role.Name != 'USER',
                  },
                  {
                    disabled:
                      role.Name === 'ADMIN' ||
                      role.Name === 'HR' ||
                      role.Name == 'USER',
                  },
                ]"
                @click="btnRoleRecordDelete(role.Id)"
                >Sil</a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :page="paginatedRoleData.page.value"
        :totalPages="paginatedRoleData.totalPages.value"
        @click="paginatedRoleData.changePage"
      ></Pagination>
    </div>

    <div id="divLoadDocument" ref="divLoadDocument" style="display: none">
      <h4>Evrak Yükleme ve Takip</h4>
      <hr />
      <form @submit.prevent="DocumentSubmit" method="post">
        <FormHeader
          @record-list-click="btnRecordListClick"
          @delete-click="btnDeleteClick"
          @reset-click="btnResetClick"
        ></FormHeader>

        <div class="border p-3">
          <div class="row mb-3">
            <div class="col-2">
              <label class="form-label">Oluşturulma Tarihi</label>
            </div>

            <div class="col-4">
              <p>{{ txtCreatedDate }}</p>
            </div>

            <div class="col-2">
              <label class="form-label">Son Güncelleme Tarihi</label>
            </div>

            <div class="col-4">
              <p>{{ txtUpdatedDate }}</p>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-2">
              <label for="documentName" class="form-label"
                >Evrak Adı <span class="star">*</span></label
              >
            </div>

            <div class="col-4">
              <input
                type="text"
                id="documentName"
                ref="documentName"
                class="form-control"
                v-model="DocumentName"
                placeholder="Evrak adı bilgisini giriniz"
              />

              <span v-if="vDocument$.DocumentName.$error" class="error"
                >Evrak adı bilgisi zorunludur.</span
              >
            </div>

            <div class="col-2">
              <label class="form-label">Durumu</label>
            </div>

            <div class="col-4">
              <p :style="stateStyle">{{ txtState }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-2">
              <label for="document" class="form-label"
                >Evrak <span class="star">*</span></label
              >
            </div>

            <div class="col-4">
              <input
                type="file"
                id="document"
                ref="document"
                class="form-control"
                @change="handleFileChange"
              />
              <p v-if="FilePath != ''">
                {{ FilePath }}
              </p>
              <span v-if="vDocument$.FilePath.$error" class="error"
                >Dosya seçmek zorunludur.</span
              >
            </div>
          </div>
        </div>
      </form>
    </div>

    <div id="divDocumentApprove" ref="divDocumentApprove" style="display: none">
      <div class="d-flex justify-content-between">
        <h4>Evrak Onay ve Reddetme</h4>
      </div>
      <hr />
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Evrak Adı</th>
            <th>Kullanıcı</th>
            <th>Yüklenme Tarihi</th>
            <th>Son Güncelleme Tarihi</th>
            <th>İndir</th>
            <th>Durumu</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="document in paginatedDocumentData.paginatedData.value">
          <tr>
            <td>{{ document.Id }}</td>
            <td>{{ document.Name }}</td>
            <td>
              {{ document.User.FirstName + " " + document.User.LastName }}
            </td>
            <td>{{ document.CreatedAt }}</td>
            <td>{{ document.UpdatedAt }}</td>
            <td>
              <a
                :href="document.FilePath"
                :download="getFileNameFromPath(document.FilePath)"
                class="btn btn-danger"
              >
                <font-awesome-icon icon="fa-download"></font-awesome-icon>
              </a>
            </td>
            <td
              :style="{
                color:
                  document.Status == 'Onay Bekliyor'
                    ? 'orange'
                    : document.Status == 'Onaylandı'
                    ? 'green'
                    : 'red',
              }"
            >
              {{ document.Status }}
            </td>
            <td>
              <a
                :class="[
                  'btn',
                  'p-1',
                  {
                    disabled:
                      document.Status === 'Onaylandı' ||
                      document.Status === 'Reddedildi',
                  },
                  'border-0',
                ]"
                @click="
                  btnApproveRejectClick(
                    document.Id,
                    document.Name,
                    document.CreatedAt,
                    document.User.FirstName,
                    document.User.LastName,
                    document.User.Email,
                    true
                  )
                "
              >
                <font-awesome-icon
                  icon="fa-circle-check"
                  :style="{
                    width: 30,
                    height: 30,
                    color: 'green',
                  }"
                ></font-awesome-icon>
              </a>

              <a
                :class="[
                  'btn',
                  'p-1',
                  {
                    disabled:
                      document.Status === 'Onaylandı' ||
                      document.Status === 'Reddedildi',
                  },
                  'border-0',
                ]"
                @click="
                  btnApproveRejectClick(
                    document.Id,
                    document.Name,
                    document.CreatedAt,
                    document.User.FirstName,
                    document.User.LastName,
                    document.User.Email,
                    false
                  )
                "
              >
                <font-awesome-icon
                  icon="fa-circle-xmark"
                  style="width: 30px; height: 30px"
                  :style="{
                    width: 30,
                    height: 30,
                    color: 'red',
                  }"
                ></font-awesome-icon>
              </a>

              <a
                class="btn btn-primary p-1 m-1"
                :style="{
                  display:
                    document.Status != 'Onay Bekliyor'
                      ? 'inline-block'
                      : 'none',
                }"
                @click="
                  btnUndoClick(
                    document.Id,
                    document.Name,
                    document.Status == 'Onaylandı'
                  )
                "
                ><font-awesome-icon
                  icon="fa-rotate-left"
                  style="width: 20px; height: 20px"
                ></font-awesome-icon
              ></a>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :page="paginatedDocumentData.page.value"
        :totalPages="paginatedDocumentData.totalPages.value"
        @click="paginatedDocumentData.changePage"
      ></Pagination>
    </div>
  </div>

  <div
    class="modal custom-modal"
    id="infoModal"
    ref="infoModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="infoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ infoMessageTitle }}</h5>
        </div>
        <div class="modal-body">
          <p>{{ infoMessage }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="btnOkClick"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal custom-modal"
    id="recordListModal"
    ref="recordListModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="recordListModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Kayıt Listesi</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="btnCloseClick"
          ></button>
        </div>
        <div class="modal-body w-100 overflow-scroll">
          <table class="table table-bordered">
            <thead>
              <tr v-if="roleName == 'ADMIN'">
                <th>Id</th>
                <th>Adı</th>
                <th>Soyadı</th>
                <th>Kullanıcı Adı</th>
                <th>Email</th>
                <th>Parola</th>
                <th>Rol</th>
                <th>Oluşturulma Tarihi</th>
                <th>Son Güncelleme Tarihi</th>
              </tr>

              <tr v-else>
                <th style="width: 20px">Id</th>
                <th style="width: 30px">Evrak Adı</th>
                <th style="width: 20px">Durumu</th>
                <th style="width: 30px">Oluşturulma Tarihi</th>
                <th style="width: 30px">Son Güncelleme Tarihi</th>
              </tr>
            </thead>
            <tbody
              v-if="roleName == 'ADMIN'"
              v-for="user in paginatedUserData.paginatedData.value"
            >
              <tr
                style="cursor: pointer"
                @click="
                  recordListRowClick(
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.UserName,
                    user.Email,
                    user.Password,
                    user.RoleId,
                    user.createdAt,
                    user.updatedAt
                  )
                "
              >
                <td>{{ user.Id }}</td>
                <td>{{ user.FirstName }}</td>
                <td>{{ user.LastName }}</td>
                <td>{{ user.UserName }}</td>
                <td>{{ user.Email }}</td>
                <td>{{ user.Password }}</td>
                <td>{{ user.Role.Name }}</td>
                <td>{{ user.createdAt }}</td>
                <td>{{ user.updatedAt }}</td>
              </tr>
            </tbody>
            <tbody
              v-else
              v-for="document in paginatedDocumentDataByUserId.paginatedData
                .value"
            >
              <tr
                style="cursor: pointer"
                @click="
                  documentRecordListRowClick(
                    document.Id,
                    document.Name,
                    document.FilePath,
                    document.Status,
                    document.CreatedAt,
                    document.UpdatedAt
                  )
                "
              >
                <td style="width: 20px">{{ document.Id }}</td>
                <td style="width: 30px">{{ document.Name }}</td>
                <td
                  :style="{
                    width: 20,
                    color:
                      document.Status == 'Onay Bekliyor'
                        ? 'orange'
                        : document.Status == 'Onaylandı'
                        ? 'green'
                        : 'red',
                  }"
                >
                  {{ document.Status }}
                </td>
                <td style="width: 30px">{{ document.CreatedAt }}</td>
                <td style="width: 30px">{{ document.UpdatedAt }}</td>
              </tr>
            </tbody>
          </table>
          <Pagination
            v-if="roleName == 'ADMIN'"
            :page="paginatedUserData.page.value"
            :totalPages="paginatedUserData.totalPages.value"
            @click="paginatedUserData.changePage"
          ></Pagination>

          <Pagination
            v-else
            :page="paginatedDocumentDataByUserId.page.value"
            :totalPages="paginatedDocumentDataByUserId.totalPages.value"
            @click="paginatedDocumentDataByUserId.changePage"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal custom-modal"
    id="roleRecordModal"
    ref="roleRecordModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="roleRecordModalLabel"
  >
    <div class="modal-dialog">
      <div class="modal-content w-100 overflow-scroll">
        <div class="modal-header">
          <h5 class="modal-title">{{ roleRecordModalTitle }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="btnCloseClick"
          ></button>
        </div>
        <form @submit.prevent="RoleSubmit" method="post">
          <div class="modal-body">
            <div class="row d-flex align-items-center">
              <div class="col-3">
                <label for="updRoleName"
                  >Rol Adı <span class="star">*</span></label
                >
              </div>

              <div class="col-9">
                <input
                  type="text"
                  id="updRoleName"
                  ref="updRoleName"
                  class="form-control"
                  v-model="RoleName"
                />

                <span v-if="vRole$.RoleName.$error" class="error"
                  >Rol adı bilgisi zorunludur.</span
                >
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal custom-modal"
    id="roleDeleteModal"
    ref="roleDeleteModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="roleDeleteModalLabel"
  >
    <div class="modal-dialog">
      <div class="modal-content w-100 overflow-scroll">
        <div class="modal-header">
          <h5 class="modal-title">Sil</h5>
        </div>
        <div class="modal-body">
          <p>
            {{ RoleName }} isimli rol kaydını silmek istediğinize emin misiniz?
          </p>
        </div>
        <div class="modal-footer">
          <a class="btn btn-primary" @click="btnRoleDeleteYesClick(RoleId)"
            >Evet</a
          >
          <a class="btn btn-danger" @click="btnRoleDeleteCancelClick">İptal</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import axios, { type AxiosResponse } from "axios";
import { Modal } from "bootstrap";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Pagination from "~/components/Pagination.vue";
import FormHeader from "~/components/FormHeader.vue";

let roleName = ref("");
let userFullName = ref("");
const router = useRouter();
let infoMessage = ref("");
let infoMessageTitle = ref("");
let selectedRole = ref("");
let roleRecordModalTitle = ref("");
const txtCreatedDate = ref("");
const txtUpdatedDate = ref("");
const txtState = ref("");
const infoModal = ref<HTMLElement | null>(null);
const roleRecordModal = ref<HTMLElement | null>(null);
const roleDeleteModal = ref<HTMLElement | null>(null);
const btnUser = ref<HTMLElement | null>(null);
const btnRole = ref<HTMLElement | null>(null);
const recordListModal = ref<HTMLElement | null>(null);
const divUser = ref<HTMLDivElement | null>(null);
const divRole = ref<HTMLDivElement | null>(null);
const divLoadDocument = ref<HTMLDivElement | null>(null);
const divDocumentApprove = ref<HTMLDivElement | null>(null);
const selectedFile = ref<File | null>(null);
let bootstrapRecordListModal: Modal | null = null;
let bootstrapInfoModal: Modal | null = null;
let bootstrapRoleRecordModal: Modal | null = null;
let bootstrapRoleDeleteModal: Modal | null = null;

const users = await axios.get("http://localhost:1337/api/users/GetAllUsers");
const allUsers = ref(users);

const roles = await axios.get("http://localhost:1337/api/roles/GetAllRoles");
const allRoles = ref(roles);

const documents = await axios.get(
  "http://localhost:1337/api/documents/GetAllDocuments"
);

const allDocuments = ref(documents);

const documentsByUserId = await axios.get(
  `http://localhost:1337/api/documents/GetAllDocumentsByUserId/${Cookies.get(
    "userId"
  )}`
);

const allDocumentsByUserId = ref(documentsByUserId);

const datas = {
  users: allUsers.value.data,
  roles: allRoles.value.data,
  documents: allDocuments.value.data,
  documentsByUserId: allDocumentsByUserId.value.data,
};

function usePagination(data: any) {
  const page = ref(1);
  const pageSize = ref(5);
  const totalItems = computed(() => data.length);
  const totalPages = computed(() =>
    Math.ceil(totalItems.value / pageSize.value)
  );

  const paginatedData = computed(() => {
    return data.slice(
      (page.value - 1) * pageSize.value,
      page.value * pageSize.value
    );
  });

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage;
    }
  };

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    paginatedData,
    changePage,
  };
}

const paginatedUserData = usePagination(datas.users);
const paginatedRoleData = usePagination(datas.roles);
const paginatedDocumentData = usePagination(datas.documents);
const paginatedDocumentDataByUserId = usePagination(datas.documentsByUserId);

// User Model
let UserId = ref(0);
const FirstName = ref("");
const LastName = ref("");
const UserName = ref("");
const Email = ref("");
const Password = ref("");
let UserCreatedAt = ref("");
let UserUpdatedAt = ref("");
let UserIsDeleted = ref(false);

// Role Model
let RoleId = ref(0);
const RoleName = ref("");
const RoleUpdatedAt = ref("");

// Document Model
let DocumentId = ref(0);
const DocumentName = ref("");
const FilePath = ref("");
const Status = ref("OB");
const DocumentIsDeleted = ref(false);

const userRules = {
  FirstName: { required },
  LastName: { required },
  UserName: { required },
  Email: { required },
  Password: { required },
  selectedRole: { required },
};

const roleRules = {
  RoleName: { required },
};

const documentRules = {
  DocumentName: { required },
  FilePath: { required },
};

const vUser$ = useVuelidate(userRules, {
  FirstName,
  LastName,
  UserName,
  Email,
  Password,
  selectedRole,
});

const vRole$ = useVuelidate(roleRules, {
  RoleName,
});

const vDocument$ = useVuelidate(documentRules, {
  DocumentName,
  FilePath,
});

onMounted(async () => {
  const isAuthenticated = Cookies.get("isAuthenticated");

  if (isAuthenticated) {
    try {
      const userId = Cookies.get("userId");
      if (
        recordListModal.value &&
        roleRecordModal.value &&
        roleDeleteModal.value &&
        infoModal.value
      ) {
        bootstrapRecordListModal = new Modal(recordListModal.value);
        bootstrapRoleRecordModal = new Modal(roleRecordModal.value);
        bootstrapRoleDeleteModal = new Modal(roleDeleteModal.value);
        bootstrapInfoModal = new Modal(infoModal.value);
      }

      if (userId) {
        const user = await axios.get(
          `http://localhost:1337/api/users/GetUser/${userId}`
        );

        const role = await axios.get(
          `http://localhost:1337/api/roles/GetRole/${user.data.RoleId}`
        );

        roleName.value = role.data.Name;
        userFullName.value = user.data.FirstName + " " + user.data.LastName;

        if (roleName.value == "USER") {
          if (
            divUser.value &&
            divRole.value &&
            divLoadDocument.value &&
            divDocumentApprove.value
          ) {
            divUser.value.style.display = "none";
            divRole.value.style.display = "none";
            divLoadDocument.value.style.display = "block";
            divDocumentApprove.value.style.display = "none";
          }
        } else if (roleName.value == "HR") {
          if (
            divUser.value &&
            divRole.value &&
            divLoadDocument.value &&
            divDocumentApprove.value
          ) {
            divUser.value.style.display = "none";
            divRole.value.style.display = "none";
            divLoadDocument.value.style.display = "none";
            divDocumentApprove.value.style.display = "block";
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    router.push("/login");
  }
});

const UserSubmit = async () => {
  vUser$.value.$touch();
  let res;

  if (!vUser$.value.$invalid) {
    if (UserIsDeleted.value) {
      const res = await axios.delete(
        `http://localhost:1337/api/users/DeleteUser/${UserId.value}`
      );

      SetInfoMessageTitle(res);
      infoMessage.value = res.data.message;
      if (bootstrapInfoModal) bootstrapInfoModal.show();
    } else {
      if (UserId.value == 0) {
        res = await axios.post("http://localhost:1337/api/users/CreateUser", {
          FirstName: FirstName.value,
          LastName: LastName.value,
          UserName: UserName.value,
          Email: Email.value,
          Password: Password.value,
          RoleId: selectedRole.value,
        });
      } else {
        res = await axios.put("http://localhost:1337/api/users/EditUser", {
          Id: UserId.value,
          FirstName: FirstName.value,
          LastName: LastName.value,
          UserName: UserName.value,
          Email: Email.value,
          Password: Password.value,
          updatedAt: UserUpdatedAt.value,
          RoleId: selectedRole.value,
        });
      }

      SetInfoModalContent(res);
      if (bootstrapInfoModal) bootstrapInfoModal.show();
    }
  }
};

const RoleSubmit = async () => {
  vRole$.value.$touch();
  let res;

  if (!vRole$.value.$invalid) {
    if (RoleId.value == 0) {
      res = await axios.post("http://localhost:1337/api/roles/CreateRole", {
        Id: RoleId.value,
        Name: RoleName.value,
      });
    } else {
      res = await axios.put("http://localhost:1337/api/roles/EditRole", {
        Id: RoleId.value,
        Name: RoleName.value,
        updatedAt: RoleUpdatedAt.value,
      });
    }

    SetInfoModalContent(res);
    if (bootstrapRoleRecordModal) bootstrapRoleRecordModal.hide();
    if (bootstrapInfoModal) bootstrapInfoModal.show();
  }
};

const DocumentSubmit = async () => {
  vDocument$.value.$touch();
  let res;

  if (!vDocument$.value.$invalid) {
    if (DocumentIsDeleted.value) {
      const res = await axios.delete(
        `http://localhost:1337/api/documents/DeleteDocument/${DocumentId.value}`
      );

      SetInfoMessageTitle(res);
      infoMessage.value = res.data.message;
      if (bootstrapInfoModal) bootstrapInfoModal.show();
    } else {
      if (DocumentId.value == 0) {
        res = await axios.post(
          "http://localhost:1337/api/documents/CreateDocument",
          {
            Name: DocumentName.value,
            FilePath: FilePath.value,
            Status: Status.value,
            UserId: Cookies.get("userId"),
          }
        );
      } else {
        res = await axios.put(
          "http://localhost:1337/api/documents/EditDocument",
          {
            Id: DocumentId.value,
            Name: DocumentName.value,
            FilePath: FilePath.value,
            UserId: Cookies.get("userId"),
          }
        );
      }

      SetInfoModalContent(res);
      await UploadFile();
    }

    if (bootstrapRoleRecordModal) bootstrapRoleRecordModal.hide();

    if (bootstrapInfoModal) bootstrapInfoModal.show();
  }
};

const btnUsersClick = () => {
  if (btnUser.value && btnRole.value && divUser.value && divRole.value) {
    btnUser.value.classList.add("active");
    btnRole.value.classList.remove("active");
    divUser.value.style.display = "block";
    divRole.value.style.display = "none";
  }
};

const btnRolesClick = () => {
  if (btnUser.value && btnRole.value && divUser.value && divRole.value) {
    btnUser.value.classList.remove("active");
    btnRole.value.classList.add("active");
    divUser.value.style.display = "none";
    divRole.value.style.display = "block";
  }
};

const btnOkClick = () => {
  if (bootstrapInfoModal) {
    bootstrapInfoModal.hide();
  }

  window.location.reload();
};

const btnDeleteClick = () => {
  UserIsDeleted.value = true;
  DocumentIsDeleted.value = true;
};

const btnRecordListClick = () => {
  if (bootstrapRecordListModal) {
    bootstrapRecordListModal.show();
  }
};

const btnCloseClick = () => {
  setTimeout(() => {
    bootstrapRecordListModal?.hide();
  }, 400);

  bootstrapRoleRecordModal?.hide();
};

const btnResetClick = () => {
  window.location.reload();
};

const recordListRowClick = (
  id: number,
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  roleId: number,
  createdAt: string,
  updatedAt: string
) => {
  UserId.value = id;
  FirstName.value = firstName;
  LastName.value = lastName;
  UserName.value = userName;
  Email.value = email;
  Password.value = password;
  UserCreatedAt.value = createdAt;
  UserUpdatedAt.value = updatedAt;
  selectedRole.value = roleId.toString();
  bootstrapRecordListModal?.hide();
};

const documentRecordListRowClick = (
  id: number,
  name: string,
  filePath: string,
  status: string,
  createdAt: string,
  updatedAt: string
) => {
  DocumentId.value = id;
  DocumentName.value = name;
  FilePath.value = filePath;
  txtState.value = status;
  txtCreatedDate.value = createdAt;
  txtUpdatedDate.value = updatedAt;
  bootstrapRecordListModal?.hide();
};

const btnRoleRecordUpdate = async (id: number) => {
  const role = await axios.get(`http://localhost:1337/api/roles/GetRole/${id}`);
  RoleId.value = role.data.Id;
  RoleName.value = role.data.Name;

  if (roleRecordModal.value) {
    roleRecordModalTitle.value = "Güncelle";
    bootstrapRoleRecordModal?.show();
  }
};

const btnRoleRecordInsert = () => {
  RoleId.value = 0;
  RoleName.value = "";

  if (roleRecordModal.value) {
    roleRecordModalTitle.value = "Yeni Kayıt";
    bootstrapRoleRecordModal?.show();
  }
};

const btnRoleRecordDelete = async (id: number) => {
  if (roleDeleteModal.value) {
    const role = await axios.get(
      `http://localhost:1337/api/roles/GetRole/${id}`
    );

    RoleId.value = id;
    RoleName.value = role.data.Name;
    bootstrapRoleDeleteModal?.show();
  }
};

const btnRoleDeleteYesClick = async (id: number) => {
  const res = await axios.delete(
    `http://localhost:1337/api/roles/DeleteRole/${id}`
  );

  infoMessageTitle.value = "Bilgi";
  infoMessage.value = res.data.message;
  bootstrapRoleDeleteModal?.hide();
  bootstrapInfoModal?.show();
};

const btnRoleDeleteCancelClick = () => {
  bootstrapRoleDeleteModal?.hide();
};

const btnLoadDocumentClick = () => {
  if (divLoadDocument.value && divUser.value && divRole.value) {
    divLoadDocument.value.style.display = "block";
    divUser.value.style.display = "none";
    divRole.value.style.display = "none";
  }
};

const stateStyle = computed(() => ({
  color:
    txtState.value == "Onay Bekliyor"
      ? "orange"
      : txtState.value == "Onaylandı"
      ? "green"
      : "red",
}));

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
    FilePath.value = "/assets/documents/" + selectedFile.value.name;
  } else {
    selectedFile.value = null;
  }
};

const UploadFile = async () => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append("file", selectedFile.value);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload result:", result);
    } catch (error) {
      console.error("Upload error:", error);
    }
  }
};

const getFileNameFromPath = (filePath: string): string => {
  const fileParts = filePath.split("/");
  return fileParts[fileParts.length - 1];
};

const btnApproveRejectClick = async (
  id: number,
  name: string,
  createDate: string,
  toUserFirstName: string,
  toUserLastName: string,
  toUserEmail: string,
  isApprove: boolean
) => {
  const updated = await axios.put(
    `http://localhost:1337/api/documents/EditDocument`,
    {
      Id: id,
      Name: name,
      Status: isApprove ? "O" : "R",
    }
  );

  const user = await axios.get(
    "http://localhost:1337/api/users/GetUser/" + Cookies.get("userId")
  );

  if (updated) {
    await SendNotification(isApprove);

    await SendEmail(
      name,
      createDate,
      toUserFirstName,
      toUserLastName,
      toUserEmail,
      user.data.Email,
      user.data.FirstName,
      user.data.LastName,
      isApprove ? "Approve" : "Reject"
    );

    window.location.reload();
  } else {
    infoMessageTitle.value = "Hata";
    infoMessage.value = `Evrak ${
      isApprove ? "onay" : "red"
    } işlemi sırasında bir hata oluştu`;

    bootstrapInfoModal?.show();
  }
};

const btnUndoClick = async (id: number, name: string, isApprove: boolean) => {
  const updated = await axios.put(
    `http://localhost:1337/api/documents/EditDocument`,
    {
      Id: id,
      Name: name,
      Status: "OB",
    }
  );

  if (updated) {
    infoMessageTitle.value = "Bilgi";
    infoMessage.value = isApprove
      ? "Onaylanan evrak geri alındı."
      : "Reddedilen evrak geri alındı.";

    bootstrapInfoModal?.show();
  }
};

const SetInfoMessageTitle = (res: AxiosResponse) => {
  if (res.data.code == 204) {
    infoMessageTitle.value = "Hata";
  } else {
    infoMessageTitle.value = "Bilgi";
  }
};

const SetInfoModalContent = (res: AxiosResponse) => {
  if (res.data.message != null) {
    infoMessageTitle.value = "Hata";
    infoMessage.value = res.data.message;
  } else {
    infoMessageTitle.value = "Bilgi";
    infoMessage.value = "Kayıt işlemi başarıyla yapıldı!";
  }
};

const SendNotification = async (isApprove: boolean) => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        console.log("Bildirim izni verilmedi");
        return;
      }

      const res = await axios.get(
        "http://localhost:1337/api/users/GetVapidKeys"
      );

      const subscribe = await registration.pushManager.getSubscription();

      if (subscribe) {
        await subscribe.unsubscribe();
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(res.data.publicKey),
      });

      await axios.post(
        "http://localhost:1337/api/users/SendNotification",
        {
          Subscription: JSON.stringify(subscription),
          PublicKey: res.data.publicKey,
          PrivateKey: res.data.privateKey,
          IsApprove: isApprove,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Service Worker kaydı veya abonelik hatası:", error);
    }
  }
};

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const SendEmail = async (
  documentName: string,
  createDate: string,
  toUserFirstName: string,
  toUserLastName: string,
  toUserEmail: string,
  fromUserEmail: string,
  fromUserFirstName: string,
  fromUserLastName: string,
  mailType: string
) => {
  await axios.post("http://localhost:1337/api/users/SendEmail", {
    DocumentName: documentName,
    CreateDate: createDate,
    ToUserFirstName: toUserFirstName,
    ToUserLastName: toUserLastName,
    ToUserEmail: toUserEmail,
    FromUserEmail: fromUserEmail,
    FromUserFirstName: fromUserFirstName,
    FromUserLastName: fromUserLastName,
    MailType: mailType,
  });
};

const logout = () => {
  Cookies.remove("token");
  Cookies.remove("isAuthenticated");
  Cookies.remove("userId");
  router.push("/login");
};
</script>
