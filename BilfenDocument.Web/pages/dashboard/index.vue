<style>
@import url("~/assets/css/style.css");
</style>

<template>
  <div class="sidebar p-3">
    <img src="~/assets/img/logo.jpg" width="100%" />
    <h6 class="bg-white text-center" style="height: 25px">
      İşe Giriş Evrak Takip Sistemi
    </h6>
    <ul class="nav flex-column" v-if="roleName == 'ADMIN'">
      <li class="nav-item mb-2">
        <a id="btnUser" ref="btnUser" class="nav-link active text-white" @click="btnUsersClick()"
          style="cursor: pointer">Kullanıcılar</a>
      </li>

      <li class="nav-item mb-2">
        <a id="btnRole" ref="btnRole" class="nav-link text-white" @click="btnRolesClick()"
          style="cursor: pointer">Roller</a>
      </li>

      <li class="nav-item mb-2">
        <a id="btnCountry" ref="btnCountry" class="nav-link text-white" @click="btnCountryClick()"
          style="cursor: pointer">Ülke Tanımları</a>
      </li>

      <li class="nav-item mb-2">
        <a id="btnCity" ref="btnCity" class="nav-link text-white" @click="btnCityClick()" style="cursor: pointer">İl
          Tanımları</a>
      </li>

      <li class="nav-item mb-2">
        <a id="btnDistrict" ref="btnDistrict" class="nav-link text-white" @click="btnDistrictClick()"
          style="cursor: pointer">İlçe Tanımları</a>
      </li>
    </ul>

    <ul class="nav flex-column" v-else-if="roleName == 'USER'">
      <li class="nav-item mb-2">
        <a id="btnLoadDocument" ref="btnLoadDocument" class="nav-link active text-white" @click="btnLoadDocumentClick()"
          style="cursor: pointer">
          Evrak Yükleme ve Takip
        </a>
      </li>
    </ul>

    <ul class="nav flex-column" v-else>
      <li class="nav-item">
        <a id="btnDocumentApprove" ref="btnDocumentApprove" class="nav-link active text-white"
          @click="btnDocumentApproveClick()" style="cursor: pointer">Evrak Onay ve Reddetme</a>
      </li>
    </ul>
  </div>

  <nav class="content navbar">
    <div class="justify-content-start">
      <a class="navbar-brand text-white" style="margin-left: 15px; cursor: pointer;" @click="btnProfileClick()">
        <img id="profileImage" ref="profileImage" width="50px" height="50px"
          style="border-radius: 50%; object-fit: cover;" alt="" src=""> <span id="lblHello">Merhaba</span>, {{
        userFullName }}
      </a>
    </div>

    <div class="justify-content-end d-flex me-3">
      <a id="btnLogout" class="btn text-white border" style="margin-right: 15px" @click="logout()">Oturumu Kapat
        <font-awesome-icon icon="fa-right-from-bracket" />
      </a>
    </div>
  </nav>

  <div class="content p-3 pb-0" v-if="roleName == 'ADMIN'">
    <div id="divUser" ref="divUser">
      <h4>Kullanıcılar</h4>
      <hr />
      <form @submit.prevent="UserSubmit" method="post">
        <FormHeader @record-list-click="btnRecordListClick" @delete-click="btnDeleteClick" @reset-click="btnResetClick" @save-as-click="btnSaveAsClick">
        </FormHeader>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item bg-white" role="presentation">
            <button class="nav-link active" id="account-tab" data-bs-toggle="tab" data-bs-target="#account"
              type="button" role="tab" aria-controls="account" aria-selected="true">Hesap Bilgileri</button>
          </li>
          <li class="nav-item bg-white" role="presentation">
            <button class="nav-link" id="core-tab" data-bs-toggle="tab" data-bs-target="#core" type="button" role="tab"
              aria-controls="core" aria-selected="false">Özlük Bilgileri</button>
          </li>
          <li class="nav-item bg-white" role="presentation">
            <button class="nav-link" id="address-tab" data-bs-toggle="tab" data-bs-target="#address" type="button"
              role="tab" aria-controls="address" aria-selected="false">Adres Bilgileri</button>
          </li>
        </ul>

        <div class="tab-content" id="userTabs">
          <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
            <div class="border p-3">
              <div class="row mb-3">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4">
                  <label class="form-label">Oluşturulma Tarihi</label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8">
                  <p>{{ UserCreatedAt }}</p>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4">
                  <label class="form-label">Son Güncelleme Tarihi</label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8">
                  <p>{{ UserUpdatedAt }}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="firstName" class="form-label">Adı <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="text" id="firstName" ref="firstName" class="form-control" v-model="FirstName"
                    placeholder="Kullanıcı isim bilgisini giriniz" />
                  <span v-if="vUser$.FirstName.$error" class="error">Adı bilgisi zorunludur.</span>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="lastName" class="form-label">Soyadı <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="text" id="lastName" ref="lastName" class="form-control" v-model="LastName"
                    placeholder="Kullanıcı soyisim bilgisini giriniz" />

                  <span v-if="vUser$.LastName.$error" class="error">Soyadı bilgisi zorunludur.</span>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="userName" class="form-label">Kullanıcı Adı <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="text" id="userName" ref="userName" class="form-control" v-model="UserName"
                    placeholder="Kullanıcı adı bilgisini giriniz" />

                  <span v-if="vUser$.UserName.$error" class="error">Kullanıcı Adı bilgisi zorunludur.</span>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="email" class="form-label">Email <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="email" id="email" ref="email" class="form-control" v-model="Email"
                    placeholder="Kullanıcı email bilgisini giriniz" />

                  <span v-if="vUser$.Email.$error" class="error">Email bilgisi zorunludur.</span>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="password" class="form-label">Parola <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="password" id="password" ref="password" class="form-control" v-model="Password"
                    placeholder="Kullanıcı parola bilgisini giriniz" />

                  <span v-if="vUser$.Password.$error" class="error">Parola bilgisi zorunludur.</span>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4">
                  <label for="role" class="form-label">Rol <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8">
                  <select ref="roleSelect" id="role" class="form-select form-control"
                    aria-label="Default select example" v-model="selectedRole">
                    <option v-for="role in allRoles.data" :key="role.Id" :value="role.Id">
                      {{ role.Name }}
                    </option>
                  </select>

                  <span v-if="vUser$.selectedRole.$error" class="error">Rol bilgisi zorunludur.</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="core" role="tabpanel" aria-labelledby="core-tab">
            <div class="border p-3">
              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label class="form-label" id="lblImage">Fotoğraf</label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <div class="upload-container m-0" style="width:80%;">
                    <h4 id="headerUploadProfilePhoto">Profil Fotoğrafı Yükle</h4>
                    <p id="txtUploadProfilePhoto" class="text-muted">Resmi sürükleyin ve bırakın veya seç butonuna
                      tıklayın</p>
                    <input type="file" id="imageUpload" ref="imageUpload" class="form-control d-none" @change="imageUploadChange" accept="image/*">
                    <button type="button" id="btnImageSelect" ref="btnImageSelect" class="btn btn-primary me-2"
                      @click="btnImageSelectClick()">Seç</button>
                    <button type="button" id="btnImageRemove" class="btn btn-danger" @click="ClearImage()">Kaldır</button>
                    <div class="upload-preview" id="uploadPreview" ref="uploadPreview"></div>
                  </div>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="serialNumber" class="form-label" id="lblSerialNumber">TC Kimlik Numarası <span
                      class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="text" id="serialNumber" ref="serialNumber" class="form-control"
                    placeholder="TC Kimlik Numarası bilgisini giriniz" v-model="SerialNumber" @keypress="allowOnlyNumbers">
                  <span v-if="vUser$.SerialNumber.$error" class="error">TC Kimlik No bilgisi zorunludur.</span>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="motherName" class="form-label" id="lblMother">Anne Adı <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="text" id="motherName" ref="motherName" class="form-control"
                    placeholder="Anne adı bilgisini giriniz" v-model="MotherName" />
                  <span v-if="vUser$.MotherName.$error" class="error">Anne Adı bilgisi zorunludur.</span>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="fatherName" class="form-label" id="lblFather">Baba Adı <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="text" id="fatherName" ref="fatherName" class="form-control"
                    placeholder="Baba adı bilgisini giriniz" v-model="FatherName" />
                  <span v-if="vUser$.FatherName.$error" class="error">Baba Adı bilgisi zorunludur.</span>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="birthDate" class="form-label" id="lblBirth">Doğum Tarihi <span
                      class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="date" id="birthDate" ref="birthDate" class="form-control"
                    placeholder="Doğum tarihi bilgisini giriniz" v-model="BirthDate" />
                  <span v-if="vUser$.BirthDate.$error" class="error">Doğum Tarihi bilgisi zorunludur.</span>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="gender" class="form-label" id="lblGenderText">Cinsiyet <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <select id="gender" ref="gender" class="form-select form-control" v-model="Gender">
                    <option value="E">Erkek</option>
                    <option value="K">Kadın</option>
                  </select>

                  <span v-if="vUser$.Gender.$error" class="error">Cinsiyet bilgisi zorunludur.</span>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="civilStatus" class="form-label" id="lblCivilStatusText">Medeni Hal <span
                      class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <select id="civilStatus" ref="civilStatus" class="form-select form-control" v-model="CivilStatus">
                    <option value="Evli">Evli</option>
                    <option value="Bekar">Bekar</option>
                  </select>

                  <span v-if="vUser$.CivilStatus.$error" class="error">Medeni Hal bilgisi zorunludur.</span>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="employmentDate" class="form-label" id="lblEmploymentDateText">İşe Giriş Tarihi <span
                      class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <input type="date" id="employmentDate" ref="employmentDate" class="form-control"
                    placeholder="İşe giriş tarihi bilgisini giriniz" v-model="EmploymentDate" />

                  <span v-if="vUser$.EmploymentDate.$error" class="error">İşe Giriş Tarihi bilgisi zorunludur.</span>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="militaryStatus" class="form-label" id="lblMilitaryStatusText">Askerlik Durumu</label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <select id="militaryStatus" ref="militaryStatus" class="form-select form-control" @change="militaryStatusChange"
                  v-model="MilitaryStatus">
                    <option value=""></option>
                    <option value="C">Tamamlamış</option>
                    <option value="P">Tecilli</option>
                    <option value="E">Muaf</option>
                  </select>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4">
                  <label for="postponementDate" class="form-label" id="lblPostponementDate" style="display: none;">Tecil
                    Tarihi <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8">
                  <input type="date" id="postponementDate" ref="postponementDate" class="form-control"
                    placeholder="Tecil tarihi bilgisini giriniz" style="display: none;" v-model="PostponementDate" />

                    <span v-if="vUser$.PostponementDate.$error" class="error">Askerlik Durumu "Tecilli" olduğunda Tecil Tarihi bilgisi zorunludur.</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab">
            <div class="border p-3">
              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="countryId" class="form-label" id="lblCountry">Ülke <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <div class="d-flex">
                    <input type="hidden" id="countryId" ref="countryId" v-model="CountryId">
                    <input id="countryName" ref="countryName" class="form-control" disabled>
                    <a class="btn pe-0 border-0" @click="btnSearchClick('Country')" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Kayıt Listesi">
                      <font-awesome-icon icon="fa-magnifying-glass" />
                    </a>
                    <a class="btn pe-0 border-0" @click="btnSearchClearClick('Country')" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Temizle">
                      <font-awesome-icon icon="fa-x" />
                    </a>
                  </div>

                  <span v-if="vUser$.CountryId.$error" class="error">Ülke bilgisi zorunludur.</span>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="cityId" class="form-label" id="lblCity">İl <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <div class="d-flex">
                    <input type="hidden" id="cityId" ref="cityId" v-model="CityId">
                    <input id="cityName" ref="cityName" class="form-control" disabled>
                    <a class="btn pe-0 border-0" @click="btnSearchClick('City')" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Kayıt Listesi">
                      <font-awesome-icon icon="fa-magnifying-glass" />
                    </a>
                    <a class="btn pe-0 border-0" @click="btnSearchClearClick('City')" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Temizle">
                      <font-awesome-icon icon="fa-x" />
                    </a>
                  </div>

                  <span v-if="vUser$.CityId.$error" class="error">İl bilgisi zorunludur.</span>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
                  <label for="districtId" class="form-label" id="lblDistrict">İlçe <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
                  <div class="d-flex">
                    <input type="hidden" id="districtId" ref="districtId" v-model="DistrictId">
                    <input id="districtName" ref="districtName" class="form-control" disabled style="height:37.6px;">
                    <a class="btn pe-0 border-0" @click="btnSearchClick('District')" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Kayıt Listesi">
                      <font-awesome-icon icon="fa-magnifying-glass" />
                    </a>
                    <a class="btn pe-0 border-0" @click="btnSearchClearClick('District')" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Temizle">
                      <font-awesome-icon icon="fa-x" />
                    </a>
                  </div>

                  <span v-if="vUser$.DistrictId.$error" class="error">İlçe bilgisi zorunludur.</span>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4">
                  <label for="address" class="form-label" id="lblAdres">Adres <span class="star">*</span></label>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8">
                  <textarea id="addressText" ref="addressText" class="form-control"
                    placeholder="Adres bilgisini giriniz" rows="5" v-model="Address"></textarea>

                  <span v-if="vUser$.Address.$error" class="error">Adres bilgisi zorunludur.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div id="divRole" ref="divRole" style="display: none;">
      <div class="d-flex justify-content-between">
        <h4 id="headerRoles">Roller</h4>

        <a class="btn" @click="btnRecordInsert(updRoleName!, 'roleRecordModal', roleRecordModal!)">
          <font-awesome-icon icon="fa-plus" style="width: 20px; height: 20px;" />
        </a>
      </div>
      <hr />
      <table id="roleTable" class="table table-bordered">
        <thead>
          <tr>
            <th>Id 
              <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(0, ($event.currentTarget as HTMLElement)!, 'roleTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(0, 'roleTable')"></font-awesome-icon></th>
            <th>Rol Adı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(1, ($event.currentTarget as HTMLElement)!, 'roleTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(1, 'roleTable')"></font-awesome-icon></th>
            <th>Oluşturulma Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(2, ($event.currentTarget as HTMLElement)!, 'roleTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(2, 'roleTable')"></font-awesome-icon></th>
            <th>Son Güncelleme Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(3, ($event.currentTarget as HTMLElement)!, 'roleTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(3, 'roleTable')"></font-awesome-icon></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

      <div class="pagination d-flex justify-content-between align-items-center">
        <div class="pagination-controls mx-auto d-flex align-items-center">
          <button id="btnPreviousRole" ref="btnPreviousRole" class="btn btn-primary me-2" @click="btnPreviousClick('roles', 'GetAllRoles', rolePageIndex!, rolePageCount!, btnPreviousRole!, btnNextRole!, 'divRole')">
            << 
          </button>

          <span><span class="page">Sayfa</span> <input type="number" id="rolePageIndex" ref="rolePageIndex" value="1" @input="pageIndexChanged(($event.currentTarget as HTMLInputElement)!, rolePageCount!, btnPreviousRole!, btnNextRole!, 'roles', 'GetAllRoles')"> / <span id="rolePageCount" ref="rolePageCount"></span> </span>

          <button id="btnNextRole" ref="btnNextRole" class="btn btn-primary ms-2" @click="btnNextClick('roles', 'GetAllRoles', rolePageIndex!, rolePageCount!, btnPreviousRole!, btnNextRole!, 'divRole')">
            >>
          </button>
        </div>

        <div class="button-container d-flex">
          <button class="download-btn btn-pdf" @click="DownloadPdf('roleTable', 'roles', 'GetAllRoles')">
            <font-awesome-icon icon="fa-file-pdf"></font-awesome-icon>
          </button>
          <button class="download-btn btn-excel" @click="DownloadExcel('roleTable', 'roles', 'GetAllRoles')">
            <font-awesome-icon icon="fa-file-excel"></font-awesome-icon>
          </button>
          <button class="download-btn btn-word" @click="DownloadWord('roleTable', 'roles', 'GetAllRoles')">
            <font-awesome-icon icon="fa-file-word"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <div id="divCountry" ref="divCountry" style="display: none;">
      <div class="d-flex justify-content-between">
        <h4 id="headerCountries">Ülkeler</h4>

        <a class="btn" @click="btnRecordInsert(updCountryName!, 'countryRecordModal', countryRecordModal!)">
          <font-awesome-icon icon="fa-plus" style="width: 20px; height: 20px;" />
        </a>
      </div>
      <hr />
      <table id="countryTable" class="table table-bordered">
        <thead>
          <tr>
            <th>Ülke Kodu <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(0, ($event.currentTarget as HTMLElement)!, 'countryTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(0, 'countryTable')"></font-awesome-icon></th>
            <th>Ülke Adı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(1, ($event.currentTarget as HTMLElement)!, 'countryTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(1, 'countryTable')"></font-awesome-icon></th>
            <th>Oluşturulma Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(2, ($event.currentTarget as HTMLElement)!, 'countryTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(2, 'countryTable')"></font-awesome-icon></th>
            <th>Son Güncelleme Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(3, ($event.currentTarget as HTMLElement)!, 'countryTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(3, 'countryTable')"></font-awesome-icon></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

      <div class="pagination d-flex justify-content-between align-items-center">
        <div class="pagination-controls mx-auto d-flex align-items-center">
          <button id="btnPreviousCountry" ref="btnPreviousCountry" class="btn btn-primary me-2"
            @click="btnPreviousClick('countries', 'GetAllCountries', countryPageIndex!, countryPageCount!, btnPreviousCountry!, btnNextCountry!, 'divCountry')">
            << </button>

              <span><span class="page">Sayfa</span> <input type="number" id="countryPageIndex" ref="countryPageIndex"
                  value="1"
                  @input="pageIndexChanged(($event.currentTarget as HTMLInputElement)!, countryPageCount!, btnPreviousCountry!, btnNextCountry!, 'countries', 'GetAllCountries')">
                / <span id="countryPageCount" ref="countryPageCount"></span> </span>

              <button id="btnNextCountry" ref="btnNextCountry" class="btn btn-primary ms-2"
                @click="btnNextClick('countries', 'GetAllCountries', countryPageIndex!, countryPageCount!, btnPreviousCountry!, btnNextCountry!, 'divCountry')">
                >>
              </button>
        </div>

        <div class="button-container d-flex">
          <button class="download-btn btn-pdf" @click="DownloadPdf('countryTable', 'countries', 'GetAllCountries')">
            <font-awesome-icon icon="fa-file-pdf" class="me-0"></font-awesome-icon>
          </button>
          <button class="download-btn btn-excel" @click="DownloadExcel('countryTable', 'countries', 'GetAllCountries')">
            <font-awesome-icon icon="fa-file-excel" class="me-0"></font-awesome-icon>
          </button>
          <button class="download-btn btn-word" @click="DownloadWord('countryTable', 'countries', 'GetAllCountries')">
            <font-awesome-icon icon="fa-file-word" class="me-0"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <div id="divCity" ref="divCity" style="display: none;">
      <div class="d-flex justify-content-between">
        <h4 id="headerCities">Şehirler</h4>

        <a class="btn" @click="btnRecordInsert(updCityName!, 'cityRecordModal', cityRecordModal!)">
          <font-awesome-icon icon="fa-plus" style="width: 20px; height: 20px;" />
        </a>
      </div>
      <hr />
      <table id="cityTable" class="table table-bordered">
        <thead>
          <tr>
            <th>İl Kodu <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(0, ($event.currentTarget as HTMLElement)!, 'cityTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(0, 'cityTable')"></font-awesome-icon></th>
            <th>İl Adı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(1, ($event.currentTarget as HTMLElement)!, 'cityTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(1, 'cityTable')"></font-awesome-icon></th>
            <th>Ülke <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(2, ($event.currentTarget as HTMLElement)!, 'cityTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(2, 'cityTable')"></font-awesome-icon></th>
            <th>Oluşturulma Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(3, ($event.currentTarget as HTMLElement)!, 'cityTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(3, 'cityTable')"></font-awesome-icon></th>
            <th>Son Güncelleme Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(4, ($event.currentTarget as HTMLElement)!, 'cityTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(4, 'cityTable')"></font-awesome-icon></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

      <div class="pagination d-flex justify-content-between align-items-center">
        <div class="pagination-controls mx-auto d-flex align-items-center">
          <button id="btnPreviousCity" ref="btnPreviousCity" class="btn btn-primary me-2"
            @click="btnPreviousClick('cities', 'GetAllCities', cityPageIndex!, cityPageCount!, btnPreviousCity!, btnNextCity!, 'divCity')">
            << </button>

              <span><span class="page">Sayfa</span> <input type="number" id="cityPageIndex" ref="cityPageIndex"
                  value="1"
                  @input="pageIndexChanged(($event.currentTarget as HTMLInputElement)!, cityPageCount!, btnPreviousCity!, btnNextCity!, 'cities', 'GetAllCities')">
                / <span id="cityPageCount" ref="cityPageCount"></span> </span>

              <button id="btnNextCity" ref="btnNextCity" class="btn btn-primary ms-2"
                @click="btnNextClick('cities', 'GetAllCities', cityPageIndex!, cityPageCount!, btnPreviousCity!, btnNextCity!, 'divCity')">
                >>
              </button>
        </div>

        <div class="button-container d-flex">
          <button class="download-btn btn-pdf" @click="DownloadPdf('cityTable', 'cities', 'GetAllCities')">
            <font-awesome-icon icon="fa-file-pdf" class="me-0"></font-awesome-icon>
          </button>
          <button class="download-btn btn-excel" @click="DownloadExcel('cityTable', 'cities', 'GetAllCities')">
            <font-awesome-icon icon="fa-file-excel" class="me-0"></font-awesome-icon>
          </button>
          <button class="download-btn btn-word" @click="DownloadWord('cityTable', 'cities', 'GetAllCities')">
            <font-awesome-icon icon="fa-file-word" class="me-0"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <div id="divDistrict" ref="divDistrict" style="display: none;">
      <div class="d-flex justify-content-between">
        <h4 id="headerDistricts">İlçeler</h4>

        <a class="btn" @click="btnRecordInsert(updDistrictName!, 'districtRecordModal', districtRecordModal!)">
          <font-awesome-icon icon="fa-plus" style="width: 20px; height: 20px;" />
        </a>
      </div>
      <hr />
      <table id="districtTable" class="table table-bordered">
        <thead>
          <tr>
            <th>İlçe Kodu <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(0, ($event.currentTarget as HTMLElement)!, 'districtTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(0, 'districtTable')"></font-awesome-icon></th>
            <th>İlçe Adı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(1, ($event.currentTarget as HTMLElement)!, 'districtTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(1, 'districtTable')"></font-awesome-icon></th>
            <th>Şehir <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(2, ($event.currentTarget as HTMLElement)!, 'districtTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(2, 'districtTable')"></font-awesome-icon></th>
            <th>Oluşturulma Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(3, ($event.currentTarget as HTMLElement)!, 'districtTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(3, 'districtTable')"></font-awesome-icon></th>
            <th>Son Güncelleme Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(4, ($event.currentTarget as HTMLElement)!, 'districtTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(4, 'districtTable')"></font-awesome-icon></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

      <div class="pagination d-flex justify-content-between align-items-center">
        <div class="pagination-controls mx-auto d-flex align-items-center">
          <button id="btnPreviousDistrict" ref="btnPreviousDistrict" class="btn btn-primary me-2"
            @click="btnPreviousClick('districts', 'GetAllDistricts', districtPageIndex!, districtPageCount!, btnPreviousDistrict!, btnNextDistrict!, 'divDistrict')">
            << </button>

              <span><span class="page">Sayfa</span> <input type="number" id="districtPageIndex" ref="districtPageIndex"
                  value="1"
                  @input="pageIndexChanged(($event.currentTarget as HTMLInputElement)!, districtPageCount!, btnPreviousDistrict!, btnNextDistrict!, 'districts', 'GetAllDistricts')">
                / <span id="districtPageCount" ref="districtPageCount"></span> </span>

              <button id="btnNextDistrict" ref="btnNextDistrict" class="btn btn-primary ms-2"
                @click="btnNextClick('districts', 'GetAllDistricts', districtPageIndex!, districtPageCount!, btnPreviousDistrict!, btnNextDistrict!, 'divDistrict')">
                >>
              </button>
        </div>

        <div class="button-container d-flex">
          <button class="download-btn btn-pdf" @click="DownloadPdf('districtTable', 'districts', 'GetAllDistricts')">
            <font-awesome-icon icon="fa-file-pdf" class="me-0"></font-awesome-icon>
          </button>
          <button class="download-btn btn-excel" @click="DownloadExcel('districtTable', 'districts', 'GetAllDistricts')">
            <font-awesome-icon icon="fa-file-excel" class="me-0"></font-awesome-icon>
          </button>
          <button class="download-btn btn-word" @click="DownloadWord('districtTable', 'districts', 'GetAllDistricts')">
            <font-awesome-icon icon="fa-file-word" class="me-0"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <div id="divProfile" ref="divProfile" style="display: none;">
      <h1 class="h4">{{ userFullName }}</h1>
      <hr>

      <div class="row">
        <div class="col-4">
          <img id="profilePageImage" ref="profilePageImage" src="" class="w-100" alt="" style="border-radius: 50%; object-fit: cover;" />
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileUserName">Kullanıcı Adı:</span>
              <span id="lblUserName" ref="lblUserName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileEmail">Email:</span>
              <span id="lblEmail" ref="lblEmail"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileMotherName">Anne Adı:</span>
              <span id="lblMotherName" ref="lblMotherName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileFatherName">Baba Adı:</span>
              <span id="lblFatherName" ref="lblFatherName"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileRole">Rol:</span>
              <span id="lblRoleName" ref="lblRoleName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileBirthDate">Doğum Tarihi:</span>
              <span id="lblBirthDate" ref="lblBirthDate"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileGender">Cinsiyet:</span>
              <span id="lblGender" ref="lblGender"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileCivilStatus">Medeni Hal:</span>
              <span id="lblCivilStatus" ref="lblCivilStatus"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileEmploymentDate">İşe Alım Tarihi:</span>
              <span id="lblEmploymentDate" ref="lblEmploymentDate"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileCountry">Ülke:</span>
              <span id="lblCountryName" ref="lblCountryName"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileMilitaryStatus">Askerlik Durumu:</span>
              <span id="lblMilitaryStatus" ref="lblMilitaryStatus"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfilePostponementDate">Tecil Tarihi:</span>
              <span id="lblPostponementDateText" ref="lblPostponementDateText"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileCity">İl:</span>
              <span id="lblCityName" ref="lblCityName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileDistrict">İlçe:</span>
              <span id="lblDistrictName" ref="lblDistrictName"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileAddress">Adres:</span>
              <span id="lblAddress" ref="lblAddress"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="content p-3 pb-0" v-else-if="roleName == 'USER'">
    <div id="divLoadDocument" ref="divLoadDocument">
      <h4>Evrak Yükleme ve Takip</h4>
      <hr />
      <form @submit.prevent="DocumentSubmit" method="post">
        <FormHeader @record-list-click="btnRecordListClick" @delete-click="btnDeleteClick" @reset-click="btnResetClick" @save-as-click="btnSaveAsClick">
        </FormHeader>

        <div class="border p-3">
          <div class="row">
            <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
              <label class="form-label">Oluşturulma Tarihi</label>
            </div>

            <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
              <p>{{ txtCreatedDate }}</p>
            </div>

            <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
              <label class="form-label">Son Güncelleme Tarihi</label>
            </div>

            <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
              <p>{{ txtUpdatedDate }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
              <label for="documentName" class="form-label">Evrak Adı <span class="star">*</span></label>
            </div>

            <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
              <input type="text" id="documentName" ref="documentName" class="form-control" v-model="DocumentName"
                placeholder="Evrak adı bilgisini giriniz" />

              <span v-if="vDocument$.DocumentName.$error" class="error">Evrak adı bilgisi zorunludur.</span>
            </div>

            <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
              <label class="form-label">Durumu</label>
            </div>

            <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
              <p :style="stateStyle">{{ txtState }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 mb-3">
              <label for="document" class="form-label">Evrak <span class="star">*</span></label>
            </div>

            <div class="col-lg-4 col-md-8 col-sm-8 col-xs-8 mb-3">
              <input type="file" id="document" ref="document" class="form-control" @change="handleFileChange" />
              <p v-if="FilePath != ''">
                {{ FilePath }}
              </p>
              <span v-if="vDocument$.FilePath.$error" class="error">Dosya seçmek zorunludur.</span>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div id="divProfile" ref="divProfile" style="display: none;">
      <h1 class="h4">{{ userFullName }}</h1>
      <hr>

      <div class="row">
        <div class="col-4">
          <img id="profilePageImage" ref="profilePageImage" src="" class="w-100" alt="" style="border-radius: 50%; object-fit: cover;" />
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileUserName">Kullanıcı Adı:</span>
              <span id="lblUserName" ref="lblUserName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileEmail">Email:</span>
              <span id="lblEmail" ref="lblEmail"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileMotherName">Anne Adı:</span>
              <span id="lblMotherName" ref="lblMotherName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileFatherName">Baba Adı:</span>
              <span id="lblFatherName" ref="lblFatherName"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileRole">Rol:</span>
              <span id="lblRoleName" ref="lblRoleName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileBirthDate">Doğum Tarihi:</span>
              <span id="lblBirthDate" ref="lblBirthDate"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileGender">Cinsiyet:</span>
              <span id="lblGender" ref="lblGender"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileCivilStatus">Medeni Hal:</span>
              <span id="lblCivilStatus" ref="lblCivilStatus"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileEmploymentDate">İşe Alım Tarihi:</span>
              <span id="lblEmploymentDate" ref="lblEmploymentDate"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileCountry">Ülke:</span>
              <span id="lblCountryName" ref="lblCountryName"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileMilitaryStatus">Askerlik Durumu:</span>
              <span id="lblMilitaryStatus" ref="lblMilitaryStatus"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfilePostponementDate">Tecil Tarihi:</span>
              <span id="lblPostponementDateText" ref="lblPostponementDateText"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileCity">İl:</span>
              <span id="lblCityName" ref="lblCityName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileDistrict">İlçe:</span>
              <span id="lblDistrictName" ref="lblDistrictName"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileAddress">Adres:</span>
              <span id="lblAddress" ref="lblAddress"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="content p-3 pb-0" v-else>
    <div id="divDocumentApprove" ref="divDocumentApprove">
      <div class="d-flex justify-content-between">
        <h4 id="headerDocumentApproveReject">Evrak Onay ve Reddetme</h4>
      </div>
      <hr />
      <table id="documentApproveTable" ref="documentApproveTable" class="table table-bordered">
        <thead>
          <tr>
            <th>Id <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(0, ($event.currentTarget as HTMLElement)!, 'documentApproveTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(0, 'documentApproveTable')"></font-awesome-icon></th>
            <th>Evrak Adı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(1, ($event.currentTarget as HTMLElement)!, 'documentApproveTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(1, 'documentApproveTable')"></font-awesome-icon></th>
            <th>Kullanıcı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(2, ($event.currentTarget as HTMLElement)!, 'documentApproveTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(2, 'documentApproveTable')"></font-awesome-icon></th>
            <th>Yüklenme Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(3, ($event.currentTarget as HTMLElement)!, 'documentApproveTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(3, 'documentApproveTable')"></font-awesome-icon></th>
            <th>Son Güncelleme Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(4, ($event.currentTarget as HTMLElement)!, 'documentApproveTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(4, 'documentApproveTable')"></font-awesome-icon></th>
            <th>İndir</th>
            <th>Durumu <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                @click="filterTable(6, ($event.currentTarget as HTMLElement)!, 'documentApproveTable')"></font-awesome-icon>
              <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                @click="sortTable(6, 'documentApproveTable')"></font-awesome-icon></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

      <div class="pagination d-flex justify-content-between align-items-center">
        <div class="pagination-controls mx-auto d-flex align-items-center">
          <button id="btnPreviousDocumentApprove" ref="btnPreviousDocumentApprove" class="btn btn-primary me-2" @click="btnPreviousClick('documents', 'GetAllDocuments', documentApprovePageIndex!, documentApprovePageCount!, btnPreviousDocumentApprove!, btnNextDocumentApprove!, 'divDocumentApprove')">
            << 
          </button>

          <span><span class="page">Sayfa</span> <input type="number" id="documentApprovePageIndex" ref="documentApprovePageIndex" value="1" @input="pageIndexChanged(($event.currentTarget as HTMLInputElement)!, documentApprovePageCount!, btnPreviousDocumentApprove!, btnNextDocumentApprove!, 'documents', 'GetAllDocuments')"> / <span id="documentApprovePageCount" ref="documentApprovePageCount"></span> </span>

          <button id="btnNextDocumentApprove" ref="btnNextDocumentApprove" class="btn btn-primary ms-2" @click="btnNextClick('documents', 'GetAllDocuments', documentApprovePageIndex!, documentApprovePageCount!, btnPreviousDocumentApprove!, btnNextDocumentApprove!, 'divDocumentApprove')">
            >>
          </button>
        </div>

        <div class="button-container d-flex">
          <button class="download-btn btn-pdf" @click="DownloadPdf('documentApproveTable', 'documents', 'GetAllDocuments')">
            <font-awesome-icon icon="fa-file-pdf" class="me-0"></font-awesome-icon>
          </button>
          <button class="download-btn btn-excel" @click="DownloadExcel('documentApproveTable', 'documents', 'GetAllDocuments')">
            <font-awesome-icon icon="fa-file-pdf" class="me-0"></font-awesome-icon>
          </button>
          <button class="download-btn btn-word" @click="DownloadWord('documentApproveTable', 'documents', 'GetAllDocuments')">
            <font-awesome-icon icon="fa-file-pdf" class="me-0"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <div id="divProfile" ref="divProfile" style="display: none;">
      <h1 class="h4">{{ userFullName }}</h1>
      <hr>

      <div class="row">
        <div class="col-4">
          <img id="profilePageImage" ref="profilePageImage" src="" class="w-100" alt="" style="border-radius: 50%; object-fit: cover;" />
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileUserName">Kullanıcı Adı:</span>
              <span id="lblUserName" ref="lblUserName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileEmail">Email:</span>
              <span id="lblEmail" ref="lblEmail"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileMotherName">Anne Adı:</span>
              <span id="lblMotherName" ref="lblMotherName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileFatherName">Baba Adı:</span>
              <span id="lblFatherName" ref="lblFatherName"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileRole">Rol:</span>
              <span id="lblRoleName" ref="lblRoleName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileBirthDate">Doğum Tarihi:</span>
              <span id="lblBirthDate" ref="lblBirthDate"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileGender">Cinsiyet:</span>
              <span id="lblGender" ref="lblGender"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileCivilStatus">Medeni Hal:</span>
              <span id="lblCivilStatus" ref="lblCivilStatus"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileEmploymentDate">İşe Alım Tarihi:</span>
              <span id="lblEmploymentDate" ref="lblEmploymentDate"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileCountry">Ülke:</span>
              <span id="lblCountryName" ref="lblCountryName"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileMilitaryStatus">Askerlik Durumu:</span>
              <span id="lblMilitaryStatus" ref="lblMilitaryStatus"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfilePostponementDate">Tecil Tarihi:</span>
              <span id="lblPostponementDateText" ref="lblPostponementDateText"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileCity">İl:</span>
              <span id="lblCityName" ref="lblCityName"></span>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileDistrict">İlçe:</span>
              <span id="lblDistrictName" ref="lblDistrictName"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
              <span class="fw-bold" id="lblProfileAddress">Adres:</span>
              <span id="lblAddress" ref="lblAddress"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="infoModal" ref="infoModal" tabindex="-1" role="dialog"
    aria-labelledby="infoModalLabel">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ infoMessageTitle }}</h5>
        </div>
        <div class="modal-body">
          <p>{{ infoMessage }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="btnOkClick">
            Tamam
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="recordListModal" ref="recordListModal" style="z-index: 1;" tabindex="-1"
    role="dialog" aria-labelledby="recordListModalLabel">
    <div class="modal-dialog" style="max-width: 1200px;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Kayıt Listesi</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnCloseClick"></button>
        </div>
        <div class="modal-body w-100 overflow-scroll">
          <table :id="roleName === 'ADMIN' ? 'userTable' : 'documentTable'" class="table table-bordered">
            <thead>
              <tr v-if="roleName == 'ADMIN'">
                <th>Id <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(0, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(0, 'userTable')"></font-awesome-icon></th>
                <th>Resim</th>
                <th>Adı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(2, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(2, 'userTable')"></font-awesome-icon></th>
                <th>Soyadı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(3, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(3, 'userTable')"></font-awesome-icon></th>
                <th>Kullanıcı Adı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(4, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(4, 'userTable')"></font-awesome-icon></th>
                <th>Email <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(5, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(5, 'userTable')"></font-awesome-icon></th>
                <th>Parola <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(6, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(6, 'userTable')"></font-awesome-icon></th>
                <th>TC Kimlik No <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(7, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(7, 'userTable')"></font-awesome-icon></th>
                <th>Rol <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(8, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(8, 'userTable')"></font-awesome-icon></th>
                <th>Oluşturulma Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(9, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(9, 'userTable')"></font-awesome-icon></th>
                <th>Son Güncelleme Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(10, ($event.currentTarget as HTMLElement)!, 'userTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(10, 'userTable')"></font-awesome-icon></th>
              </tr>

              <tr v-else>
                <th style="width: 20px">Id <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(0, ($event.currentTarget as HTMLElement)!, 'documentTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(0, 'documentTable')"></font-awesome-icon></th>
                <th style="width: 30px">Evrak Adı <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(1, ($event.currentTarget as HTMLElement)!, 'documentTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(1, 'documentTable')"></font-awesome-icon></th>
                <th style="width: 20px">Durumu <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(2, ($event.currentTarget as HTMLElement)!, 'documentTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(2, 'documentTable')"></font-awesome-icon></th>
                <th style="width: 30px">Oluşturulma Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(3, ($event.currentTarget as HTMLElement)!, 'documentTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(3, 'documentTable')"></font-awesome-icon></th>
                <th style="width: 30px">Son Güncelleme Tarihi <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(4, ($event.currentTarget as HTMLElement)!, 'documentTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(4, 'documentTable')"></font-awesome-icon></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>

          <div v-if="roleName == 'ADMIN'" class="pagination d-flex justify-content-between align-items-center">
            <div class="pagination-controls mx-auto d-flex align-items-center">
              <button id="btnPreviousUser" ref="btnPreviousUser" class="btn btn-primary me-2" @click="btnPreviousClick('users', 'GetAllUsers', userPageIndex!, userPageCount!, btnPreviousUser!, btnNextUser!, 'recordListModal')">
                << 
              </button>

              <span><span class="page">Sayfa</span> <input type="number" id="userPageIndex" ref="userPageIndex" value="1" @input="pageIndexChanged(($event.currentTarget as HTMLInputElement)!, userPageCount!, btnPreviousUser!, btnNextUser!, 'users', 'GetAllUsers')"> / <span id="userPageCount" ref="userPageCount"></span> </span>

              <button id="btnNextUser" ref="btnNextUser" class="btn btn-primary ms-2" @click="btnNextClick('users', 'GetAllUsers', userPageIndex!, userPageCount!, btnPreviousUser!, btnNextUser!, 'recordListModal')">
                >>
              </button>
            </div>

            <div class="button-container d-flex">
              <button class="download-btn btn-pdf" @click="DownloadPdf('userTable', 'users', 'GetAllUsers')">
                <font-awesome-icon icon="fa-file-pdf" class="me-0"></font-awesome-icon>
              </button>
              <button class="download-btn btn-excel" @click="DownloadExcel('userTable', 'users', 'GetAllUsers')">
                <font-awesome-icon icon="fa-file-excel" class="me-0"></font-awesome-icon>
              </button>
              <button class="download-btn btn-word" @click="DownloadWord('userTable', 'users', 'GetAllUsers')">
                <font-awesome-icon icon="fa-file-word" class="me-0"></font-awesome-icon>
              </button>
            </div>
          </div>

          <div v-else class="pagination d-flex justify-content-between align-items-center">
            <div class="pagination-controls mx-auto d-flex align-items-center">
              <button id="btnPreviousDocument" ref="btnPreviousDocument" class="btn btn-primary me-2"
                @click="btnPreviousClick('documents', `GetAllDocumentsByUserId/${ Cookies.get('userId') }`, documentPageIndex!, documentPageCount!, btnPreviousDocument!, btnNextDocument!, 'recordListModal')">
                << </button>

                  <span><span class="page">Sayfa</span> <input type="number" id="documentPageIndex"
                      ref="documentPageIndex" value="1"
                      @input="pageIndexChanged(($event.currentTarget as HTMLInputElement)!, documentPageCount!, btnPreviousDocument!, btnNextDocument!, 'documents', `GetAllDocumentsByUserId/${ Cookies.get('userId') }`)">
                    / <span id="documentPageCount" ref="documentPageCount"></span> </span>

                  <button id="btnNextDocument" ref="btnNextDocument" class="btn btn-primary ms-2"
                    @click="btnNextClick('documents', `GetAllDocumentsByUserId/${ Cookies.get('userId') }`, documentPageIndex!, documentPageCount!, btnPreviousDocument!, btnNextDocument!, 'recordListModal')">
                    >>
                  </button>
            </div>

            <div class="button-container d-flex">
              <button class="download-btn btn-pdf" @click="DownloadPdf('documentTable', 'documents', `GetAllDocumentsByUserId/${ Cookies.get('userId') }`)">
                <font-awesome-icon icon="fa-file-pdf" class="me-0"></font-awesome-icon>
              </button>
              <button class="download-btn btn-excel" @click="DownloadExcel('documentTable', 'documents', `GetAllDocumentsByUserId/${ Cookies.get('userId') }`)">
                <font-awesome-icon icon="fa-file-excel" class="me-0"></font-awesome-icon>
              </button>
              <button class="download-btn btn-word" @click="DownloadWord('documentTable', 'documents', `GetAllDocumentsByUserId/${ Cookies.get('userId') }`)">
                <font-awesome-icon icon="fa-file-word" class="me-0"></font-awesome-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="roleRecordModal" ref="roleRecordModal" tabindex="-1" role="dialog"
    aria-labelledby="roleRecordModalLabel">
    <div class="modal-dialog">
      <div class="modal-content w-100 overflow-scroll">
        <div class="modal-header">
          <h5 class="modal-title">{{ roleRecordModalTitle }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnCloseClick"></button>
        </div>
        <form @submit.prevent="RoleSubmit" method="post">
          <div class="modal-body">
            <div class="row d-flex align-items-center">
              <div class="col-3">
                <label for="updRoleName">Rol Adı <span class="star">*</span></label>
              </div>

              <div class="col-9">
                <input type="text" id="updRoleName" ref="updRoleName" class="form-control" v-model="RoleName" />

                <span v-if="vRole$.RoleName.$error" class="error">Rol adı bilgisi zorunludur.</span>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal" id="roleDeleteModal" ref="roleDeleteModal" tabindex="-1" role="dialog"
    aria-labelledby="roleDeleteModalLabel">
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
          <a class="btn btn-primary"
            @click="btnDeleteYesClick('roles', 'DeleteRole', RoleId.toString(), roleDeleteModal)">Evet</a>
          <a class="btn btn-danger" @click="btnDeleteCancelClick(roleDeleteModal!)">İptal</a>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="countryRecordModal" ref="countryRecordModal" style="z-index: 1;" tabindex="-1" role="dialog"
    aria-labelledby="countryRecordModalLabel">
    <div class="modal-dialog" style="max-width: 500px;">
      <div class="modal-content w-100 overflow-scroll">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="btnCloseClick()">
          </button>
        </div>
        <form id="countryForm" @submit.prevent="CountrySubmit" method="post">
          <div class="modal-body">
            <div class="row d-flex align-items-center mb-3">
              <div class="col-4">
                <label for="updCountryCode" id="mdlCountryCode">Ülke Kodu <span class="star">*</span></label>
              </div>

              <div class="col-8">
                <input type="text" id="updCountryCode" ref="updCountryCode" v-model="CountryCode" class="form-control" />
                <span v-if="vCountry$.CountryCode.$error" class="error">Ülke Kodu bilgisi zorunludur.</span>
              </div>
            </div>

            <div class="row d-flex align-items-center">
              <div class="col-4">
                <label for="updCountryName" id="mdlCountryName">Ülke Adı <span class="star">*</span></label>
              </div>

              <div class="col-8">
                <input type="text" id="updCountryName" ref="updCountryName" v-model="CountryText" class="form-control" />
                <span v-if="vCountry$.CountryText.$error" class="error">Ülke Adı bilgisi zorunludur.</span>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="submit" class="btn btn-primary btnSave" data-bs-dismiss="modal">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal" id="countryDeleteModal" ref="countryDeleteModal" tabindex="-1" role="dialog"
    aria-labelledby="countryDeleteModalLabel">
    <div class="modal-dialog" style="max-width: 500px">
      <div class="modal-content w-100 overflow-scroll">
        <div class="modal-header">
          <h5 class="modal-title lblDelete">Sil</h5>
        </div>
        <div class="modal-body">
          <p>{{ CountryName }} isimli ülke kaydını silmek istediğinize emin misiniz?</p>
        </div>
        <div class="modal-footer">
          <a class="btn btn-primary btnDeleteYes"
            @click="btnDeleteYesClick('countries', 'DeleteCountry', CountryId, countryDeleteModal)">Evet</a>
          <a class="btn btn-danger btnDeleteCancel" @click="btnDeleteCancelClick(countryDeleteModal!)">İptal</a>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="cityRecordModal" ref="cityRecordModal" style="z-index: 1;" tabindex="-1" role="dialog"
    aria-labelledby="cityRecordModalLabel">
    <div class="modal-dialog" style="max-width: 500px;">
      <div class="modal-content w-100 overflow-scroll">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnCloseClick()"></button>
        </div>
        <form id="cityForm" @submit.prevent="CitySubmit" method="post">
          <div class="modal-body">
            <div class="row mb-3 d-flex align-items-center">
              <div class="col-3">
                <label for="updCityCode" id="mdlCityCode">İl Kodu <span class="star">*</span></label>
              </div>

              <div class="col-9">
                <input type="text" id="updCityCode" class="form-control" v-model="CityCode" />
                <span v-if="vCity$.CityCode.$error" class="error">İl Kodu bilgisi zorunludur.</span>
              </div>
            </div>

            <div class="row mb-3 d-flex align-items-center">
              <div class="col-3">
                <label for="updCityName" id="mdlCityName">İl Adı <span class="star">*</span></label>
              </div>

              <div class="col-9">
                <input type="text" id="updCityName" ref="updCityName" class="form-control" v-model="CityText" />
                <span v-if="vCity$.CityText.$error" class="error">İl Adı bilgisi zorunludur.</span>
              </div>
            </div>

            <div class="row d-flex align-items-center">
              <div class="col-3">
                <label for="updCountryId" id="mdlCountry">Ülke <span class="star">*</span></label>
              </div>

              <div class="col-9 d-flex">
                <input type="hidden" id="updCountryId" ref="updCountryId" v-model="CityCountryCode">
                <input id="popCountryName" ref="popCountryName" class="form-control d-inline-block" disabled>
                <a class="btn pe-0 border-0" @click="btnSearchClick('CityCountry')" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Kayıt Listesi">
                  <font-awesome-icon icon="fa-magnifying-glass" />
                </a>
                <a class="btn pe-0 border-0" @click="btnSearchClearClick('CityCountry')" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Temizle">
                  <font-awesome-icon icon="fa-x" />
                </a>
              </div>
            </div>

            <div class="row">
              <div class="col-3"></div>
              <div class="col-9">
                <span v-if="vCity$.CityCountryCode.$error" class="error">Ülke bilgisi zorunludur.</span>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="submit" class="btn btn-primary btnSave" data-bs-dismiss="modal">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal" id="cityDeleteModal" ref="cityDeleteModal" tabindex="-1" role="dialog"
    aria-labelledby="cityDeleteModalLabel">
    <div class="modal-dialog" style="max-width: 500px">
      <div class="modal-content w-100 overflow-scroll">
        <div class="modal-header">
          <h5 class="modal-title lblDelete">Sil</h5>
        </div>
        <div class="modal-body">
          <p>{{ CityName }} isimli il kaydını silmek istediğinize emin misiniz?</p>
        </div>
        <div class="modal-footer">
          <a class="btn btn-primary btnDeleteYes"
            @click="btnDeleteYesClick('cities', 'DeleteCity', CityId, cityDeleteModal)">Evet</a>
          <a class="btn btn-danger btnDeleteCancel" @click="btnDeleteCancelClick(cityDeleteModal!)">İptal</a>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="districtRecordModal" ref="districtRecordModal" style="z-index: 1;" tabindex="-1" role="dialog"
    aria-labelledby="districtRecordModalLabel">
    <div class="modal-dialog" style="max-width: 500px;">
      <div class="modal-content w-100 overflow-scroll">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="btnCloseClick()">
          </button>
        </div>
        <form id="districtForm" @submit.prevent="DistrictSubmit" method="post">
          <div class="modal-body">
            <div class="row mb-3 d-flex align-items-center">
              <div class="col-4">
                <label for="updDistrictCode" id="mdlDistrictCode">İlçe Kodu <span class="star">*</span></label>
              </div>

              <div class="col-8">
                <input type="text" id="updDistrictCode" class="form-control" v-model="DistrictCode"/>
                <span v-if="vDistrict$.DistrictCode.$error" class="error">İlçe Kodu bilgisi zorunludur.</span>
              </div>
            </div>

            <div class="row mb-3 d-flex align-items-center">
              <div class="col-4">
                <label for="updDistrictName" id="mdlDistrictName">İlçe Adı <span class="star">*</span></label>
              </div>

              <div class="col-8">
                <input type="text" id="updDistrictName" ref="updDistrictName" class="form-control" v-model="DistrictText" />
                <span v-if="vDistrict$.DistrictText.$error" class="error">İlçe Adı bilgisi zorunludur.</span>
              </div>
            </div>

            <div class="row d-flex align-items-center">
              <div class="col-4">
                <label for="updCityId" id="mdlCity">İl <span class="star">*</span></label>
              </div>

              <div class="col-8 d-flex">
                <input type="hidden" id="updCityId" ref="updCityId" v-model="DistrictCityCode">
                <input id="popCityName" ref="popCityName" class="form-control d-inline-block" disabled>
                <a class="btn pe-0 border-0" @click="btnSearchClick('DistrictCity')" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Kayıt Listesi">
                  <font-awesome-icon icon="fa-magnifying-glass" />
                </a>
                <a class="btn pe-0 border-0" @click="btnSearchClearClick('DistrictCity')" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Temizle">
                  <font-awesome-icon icon="fa-x" />
                </a>
              </div>

              <div class="row">
                <div class="col-4"></div>
                <div class="col-8">
                  <span v-if="vDistrict$.DistrictCityCode.$error" class="error">İl bilgisi zorunludur.</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="submit" class="btn btn-primary btnSave" data-bs-dismiss="modal">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal" id="districtDeleteModal" ref="districtDeleteModal" tabindex="-1" role="dialog"
    aria-labelledby="districtDeleteModalLabel">
    <div class="modal-dialog" style="max-width: 500px">
      <div class="modal-content w-100 overflow-scroll">
        <div class="modal-header">
          <h5 class="modal-title lblDelete">Sil</h5>
        </div>
        <div class="modal-body">
          <p>{{ DistrictName }} isimli ilçe kaydını silmek istediğinize emin misiniz?</p>
        </div>
        <div class="modal-footer">
          <a class="btn btn-primary btnDeleteYes"
            @click="btnDeleteYesClick('districts', 'DeleteDistrict', DistrictId, districtDeleteModal)">Evet</a>
          <a class="btn btn-danger btnDeleteCancel" @click="btnDeleteCancelClick(districtDeleteModal!)">İptal</a>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="searchListModal" ref="searchListModal" style="z-index: 1;" tabindex="-1" role="dialog"
    aria-labelledby="searchListModalLabel">
    <div class="modal-dialog" style="width: 500px;">
      <div class="modal-content" style="max-height:500px; overflow:scroll;">
        <div class="modal-header">
          <h5 class="modal-title">Kayıt Listesi</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnCloseSearchClick()">
          </button>
        </div>
        <div class="modal-body w-100 overflow-scroll">
          <table id="searchListTable" class="table table-bordered">
            <thead>
              <tr>
                <th>Kod <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(0, ($event.currentTarget as HTMLElement)!, 'searchListTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(0, 'searchListTable')"></font-awesome-icon></th>
                <th>Ad <font-awesome-icon icon="fa-filter" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="filterTable(1, ($event.currentTarget as HTMLElement)!, 'searchListTable')"></font-awesome-icon>
                  <font-awesome-icon icon="fa-sort" class="me-1" style="cursor: pointer; float: right; line-height: 25px;"
                  @click="sortTable(1, 'searchListTable')"></font-awesome-icon></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Cookies from "js-cookie";
import axios, { type AxiosResponse } from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required } from '@vuelidate/validators'
import FormHeader from "~/components/FormHeader.vue";
const { $html2pdf } = useNuxtApp();
const xlsx: any = useNuxtApp().$xlsx;

let roleName = ref("");
let userFullName = ref("");
const router = useRouter();
let infoMessage = ref("");
let infoMessageTitle = ref("");
let selectedRole = ref("1");
let roleRecordModalTitle = ref("");
const txtCreatedDate = ref("");
const txtUpdatedDate = ref("");
const txtState = ref("");
const infoModal = ref<HTMLElement | null>(null);
const roleRecordModal = ref<HTMLElement | null>(null);
const roleDeleteModal = ref<HTMLElement | null>(null);
const btnUser = ref<HTMLElement | null>(null);
const btnRole = ref<HTMLElement | null>(null);
const btnCountry = ref<HTMLElement | null>(null);
const btnCity = ref<HTMLElement | null>(null);
const btnDistrict = ref<HTMLElement | null>(null);
const recordListModal = ref<HTMLElement | null>(null);
const divUser = ref<HTMLDivElement | null>(null);
const divRole = ref<HTMLDivElement | null>(null);
const divCountry = ref<HTMLDivElement | null>(null);
const divCity = ref<HTMLDivElement | null>(null);
const divDistrict = ref<HTMLDivElement | null>(null);
const divLoadDocument = ref<HTMLDivElement | null>(null);
const divDocumentApprove = ref<HTMLDivElement | null>(null);
const divProfile = ref<HTMLDivElement | null>(null);
const selectedFile = ref<File | null>(null);
const uploadPreview = ref<HTMLElement | null>(null);
const countryId = ref<HTMLInputElement | null>(null);
const countryName = ref<HTMLInputElement | null>(null);
const cityId = ref<HTMLInputElement | null>(null);
const cityName = ref<HTMLInputElement | null>(null);
const districtId = ref<HTMLInputElement | null>(null);
const districtName = ref<HTMLInputElement | null>(null);
const searchListModal = ref<HTMLElement | null>(null);
const updCountryId = ref<HTMLInputElement | null>(null);
const popCountryName = ref<HTMLInputElement | null>(null);
const updCityId = ref<HTMLInputElement | null>(null);
const popCityName = ref<HTMLInputElement | null>(null);
const userPageIndex = ref<HTMLInputElement | null>(null);
const userPageCount = ref<HTMLElement | null>(null);
const btnPreviousUser = ref<HTMLElement | null>(null);
const btnNextUser = ref<HTMLElement | null>(null);
const rolePageIndex = ref<HTMLInputElement | null>(null);
const rolePageCount = ref<HTMLElement | null>(null);
const btnPreviousRole = ref<HTMLElement | null>(null);
const btnNextRole = ref<HTMLElement | null>(null);
const updRoleName = ref<HTMLInputElement | null>(null);
const countryPageIndex = ref<HTMLInputElement | null>(null);
const countryPageCount = ref<HTMLElement | null>(null);
const btnPreviousCountry = ref<HTMLElement | null>(null);
const btnNextCountry = ref<HTMLElement | null>(null);
const countryRecordModal = ref<HTMLElement | null>(null);
const countryDeleteModal = ref<HTMLElement | null>(null);
const updCountryName = ref<HTMLInputElement | null>(null);
const cityPageIndex = ref<HTMLInputElement | null>(null);
const cityPageCount = ref<HTMLElement | null>(null);
const btnPreviousCity = ref<HTMLElement | null>(null);
const btnNextCity = ref<HTMLElement | null>(null);
const cityRecordModal = ref<HTMLElement | null>(null);
const cityDeleteModal = ref<HTMLElement | null>(null);
const updCityName = ref<HTMLInputElement | null>(null);
const districtPageIndex = ref<HTMLInputElement | null>(null);
const districtPageCount = ref<HTMLElement | null>(null);
const btnPreviousDistrict = ref<HTMLElement | null>(null);
const btnNextDistrict = ref<HTMLElement | null>(null);
const districtRecordModal = ref<HTMLElement | null>(null);
const districtDeleteModal = ref<HTMLElement | null>(null);
const updDistrictName = ref<HTMLInputElement | null>(null);
const documentPageIndex = ref<HTMLInputElement | null>(null);
const documentPageCount = ref<HTMLElement | null>(null);
const btnPreviousDocument = ref<HTMLElement | null>(null);
const btnNextDocument = ref<HTMLElement | null>(null);
const documentApprovePageIndex = ref<HTMLInputElement | null>(null);
const documentApprovePageCount = ref<HTMLElement | null>(null);
const btnPreviousDocumentApprove = ref<HTMLElement | null>(null);
const btnNextDocumentApprove = ref<HTMLElement | null>(null);
const profileImage = ref<HTMLImageElement | null>(null);
const profilePageImage = ref<HTMLImageElement | null>(null);
const lblUserName = ref<HTMLElement | null>(null);
const lblEmail = ref<HTMLElement | null>(null);
const lblMotherName = ref<HTMLElement | null>(null);
const lblFatherName = ref<HTMLElement | null>(null);
const lblRoleName = ref<HTMLElement | null>(null);
const lblBirthDate = ref<HTMLElement | null>(null);
const lblGender = ref<HTMLElement | null>(null);
const lblCivilStatus = ref<HTMLElement | null>(null);
const lblEmploymentDate = ref<HTMLElement | null>(null);
const lblCountryName = ref<HTMLElement | null>(null);
const lblMilitaryStatus = ref<HTMLElement | null>(null);
const lblPostponementDateText = ref<HTMLElement | null>(null);
const lblCityName = ref<HTMLElement | null>(null);
const lblDistrictName = ref<HTMLElement | null>(null);
const lblAddress = ref<HTMLElement | null>(null);
const militaryStatus = ref<HTMLSelectElement | null>(null);
const postponementDate = ref<HTMLInputElement | null>(null);
const serialNumber = ref<HTMLInputElement | null>(null);
const addressText = ref<HTMLInputElement | null>(null);
const imageUpload = ref<HTMLInputElement | null>(null);
let ImageFilePath = ref("");
let CountryName = ref("");
let CityName = ref("");
let DistrictName = ref("");

const roles = await axios.get("http://localhost:1337/api/roles/GetAllRoles");
const allRoles = ref(roles);

onMounted(async () => {
  debugger;
  const isAuthenticated = Cookies.get("isAuthenticated");

  if (isAuthenticated) {
    try {
      const userId = Cookies.get("userId");

      if (userId) {
        const user = await axios.get(
          `http://localhost:1337/api/users/GetUser/${userId}`
        );

        const role = await axios.get(
          `http://localhost:1337/api/roles/GetRole/${user.data.RoleId}`
        );

        roleName.value = role.data.Name;
        userFullName.value = user.data.FirstName + " " + user.data.LastName;

        if(roleName.value == "ADMIN") {
          const allUsers = await axios.get("http://localhost:1337/api/users/GetAllUsers");
          const paginatedUserData = usePagination(allUsers.data, userPageIndex.value!.value);
          const allRoles = await axios.get("http://localhost:1337/api/roles/GetAllRoles");
          const paginatedRoleData = usePagination(allRoles.data, rolePageIndex.value!.value);
          const allCountries = await axios.get("http://localhost:1337/api/countries/GetAllCountries");
          const paginatedCountryData = usePagination(allCountries.data, countryPageIndex.value!.value);
          const allCities = await axios.get("http://localhost:1337/api/cities/GetAllCities");
          const paginatedCityData = usePagination(allCities.data, cityPageIndex.value!.value);
          const allDistricts = await axios.get("http://localhost:1337/api/districts/GetAllDistricts");
          const paginatedDistrictData = usePagination(allDistricts.data, districtPageIndex.value!.value);
          const tableCountry = document.querySelector<Element>("#divCountry table tbody");
          const tableCity = document.querySelector<Element>("#divCity table tbody");
          const tableDistrict = document.querySelector<Element>("#divDistrict table tbody");
          const tableRecordList = document.querySelector<Element>("#recordListModal table tbody");
          const tableRole = document.querySelector<Element>("#divRole table tbody");

          checkPreviousAndNextButtons(paginatedUserData, btnPreviousUser.value!, btnNextUser.value!);
          showData(paginatedUserData, 'recordListModal', userPageCount.value!);
          checkPreviousAndNextButtons(paginatedRoleData, btnPreviousRole.value!, btnNextRole.value!);
          showData(paginatedRoleData, 'divRole', rolePageCount.value!);
          checkPreviousAndNextButtons(paginatedCountryData, btnPreviousCountry.value!, btnNextCountry.value!);
          showData(paginatedCountryData, 'divCountry', countryPageCount.value!);
          checkPreviousAndNextButtons(paginatedCityData, btnPreviousCity.value!, btnNextCity.value!);
          showData(paginatedCityData, 'divCity', cityPageCount.value!);
          checkPreviousAndNextButtons(paginatedDistrictData, btnPreviousDistrict.value!, btnNextDistrict.value!);
          showData(paginatedDistrictData, 'divDistrict', districtPageCount.value!);

          checkTableEmpty(tableCountry!);
          checkTableEmpty(tableCity!);
          checkTableEmpty(tableDistrict!);
          checkTableEmpty(tableRecordList!);
          checkTableEmpty(tableRole!);

          const lblPostponementDate = document.getElementById('lblPostponementDate');

          if(militaryStatus.value && lblPostponementDate && postponementDate.value){
            if (militaryStatus.value.value === 'P') {
              lblPostponementDate.style.display = 'block';
              postponementDate.value.style.display = 'block';
            }

            else {
              lblPostponementDate.style.display = 'none';
              postponementDate.value.style.display = 'none';
            }
          }
        }

        else if (roleName.value == 'USER') {
          const allDocuments = await axios.get(`http://localhost:1337/api/documents/GetAllDocumentsByUserId/${ userId }`);
          const paginatedDocumentData = usePagination(allDocuments.data, documentPageIndex.value!.value);
          const tableLoadDocument = document.querySelector("#recordListModal table tbody");
          checkPreviousAndNextButtons(paginatedDocumentData, btnPreviousDocument.value!, btnNextDocument.value!);
          showData(paginatedDocumentData, 'recordListModal', documentPageCount.value!);
          checkTableEmpty(tableLoadDocument!);
        }

        else {
          const allDocuments = await axios.get("http://localhost:1337/api/documents/GetAllDocuments");
          const paginatedDocumentApproveData = usePagination(allDocuments.data, documentApprovePageIndex.value!.value);
          checkPreviousAndNextButtons(paginatedDocumentApproveData, btnPreviousDocumentApprove.value!, btnNextDocumentApprove.value!);
          showData(paginatedDocumentApproveData, 'divDocumentApprove', documentApprovePageCount.value!);
          const tableDocumentApprove = document.querySelector<Element>("#divDocumentApprove table tbody");
          checkTableEmpty(tableDocumentApprove!);
        }

        const userData = await axios.get("http://localhost:1337/api/users/GetUser/" + userId);

        if(profileImage.value && profilePageImage.value && lblUserName.value && lblEmail.value && lblMotherName.value && lblFatherName.value && lblRoleName.value && lblBirthDate.value && lblGender.value && lblCivilStatus.value && lblEmploymentDate.value && lblCountryName.value && lblMilitaryStatus.value && lblPostponementDateText.value && lblCityName.value && lblDistrictName.value && lblAddress.value) {
          profileImage.value.src = userData.data.ImagePath == null ? (userData.data.Gender === 'Erkek' ? '/assets/img/Man.png' : '/assets/img/Woman.png') : userData.data.ImagePath;
          profilePageImage.value.src = userData.data.ImagePath == null ? (userData.data.Gender === 'Erkek' ? '/assets/img/Man.png' : '/assets/img/Woman.png') : userData.data.ImagePath;
          lblUserName.value.textContent = userData.data.UserName;
          lblEmail.value.textContent = userData.data.Email;
          lblMotherName.value.textContent = userData.data.MotherName;
          lblFatherName.value.textContent = userData.data.FatherName;
          lblRoleName.value.textContent = userData.data.Role.Name;
          lblBirthDate.value.textContent = userData.data.BirthDate;
          lblGender.value.textContent = userData.data.Gender;
          lblCivilStatus.value.textContent = userData.data.CivilStatus;
          lblEmploymentDate.value.textContent = userData.data.EmploymentDate;
          lblCountryName.value.textContent = userData.data.Country.Name;
          lblMilitaryStatus.value.textContent = userData.data.MilitaryStatus ?? '-';
          lblPostponementDateText.value.textContent = userData.data.PostponementDate ?? '-';
          lblCityName.value.textContent = userData.data.City.Name;
          lblDistrictName.value.textContent = userData.data.District.Name;
          lblAddress.value.textContent = userData.data.Address;
        }
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    router.push("/login");
  }
});

const allowOnlyNumbers = (event: any) => {
  if (!/[0-9]/.test(event.key) || serialNumber.value!.value.length >= 11) {
    event.preventDefault();
  }
}

const checkTableEmpty = (table: Element) => {
  if(!table.querySelector<Element>("tr")) {
    table.parentNode!.querySelector<Element>('thead')!.remove();
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = "Listelenecek bir kayıt bulunamadı.";
    td.colSpan = 5;
    tr.appendChild(td);
    table.appendChild(tr);
  }
}

const usePagination = (data: any, pageIndex: string) => {
  let page = { val: pageIndex }
  const pageSize = 5;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = () => {
    return data.slice((Number(page.val) - 1) * pageSize, Number(page.val) * pageSize);
  };

  const changePage = (newPage: any) => {
    if (newPage >= 1 && newPage <= totalPages) {
      page.val = newPage;
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

const checkPreviousAndNextButtons = (paginatedData: any, btnPrevious: HTMLElement, btnNext: HTMLElement) => {
  debugger;
  if (paginatedData.page.val <= 1) {
    btnPrevious.classList.remove("btn-primary");
    btnPrevious.classList.add("btn-dark");
    btnPrevious.classList.add("disabled");
  }

  else {
    btnPrevious.classList.remove("btn-dark");
    btnPrevious.classList.add("btn-primary");
    btnPrevious.classList.remove("disabled");
  }

  if (paginatedData.page.val >= paginatedData.totalPages) {
    btnNext.classList.remove("btn-primary");
    btnNext.classList.add("btn-dark");
    btnNext.classList.add("disabled");
  }

  else {
    btnNext.classList.remove("btn-dark");
    btnNext.classList.add("btn-primary");
    btnNext.classList.remove("disabled");
  }
}

const showData = (paginatedData: any, id: string, pageCount: HTMLElement) => {
  debugger;
  const tbody = document.querySelector<HTMLTableSectionElement>(`#${id} table tbody`);
  let tr;
  let td;
  let linkUpdate;
  let linkDelete;
  let linkApprove;
  let linkReject;
  let linkUndo;

  if (tbody) {
    tbody.innerHTML = '';
  }

  if (id === 'recordListModal') {
    if (roleName.value == 'ADMIN') {
      paginatedData.paginatedData().forEach((user: any) => {
        tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', () => recordListRowClick(user.Id, user.FirstName, user.LastName, user.UserName, user.Email,
                                                              user.Password, user.RoleId, user.createdAt, user.updatedAt, user.TCKN,
                                                              user.MotherName, user.FatherName, user.BirthDate, user.Gender, user.CivilStatus,
                                                              user.EmploymentDate, user.MilitaryStatus, user.PostponementDate, user.CountryId, 
                                                              user.Country.Name, user.CityId, user.City.Name, user.DistrictId, user.District.Name,
                                                              user.Address, user.ImagePath));

        tr.innerHTML += `
          <td>${user.Id}</td>
          <td>${user.ImagePath ? `<img src="${user.ImagePath}" width="100px" height="100px" alt="Kullanıcı Fotoğrafı" />` : user.Gender === 'Erkek'
            ? `<img src="/assets/img/Man.png" width="100px" height="100px" alt="Varsayılan Erkek Fotoğrafı" />`
            : `<img src="/assets/img/Woman.png" width="100px" height="100px" alt="Varsayılan Kadın Fotoğrafı" />`}
          </td>
          <td>${user.FirstName}</td>
          <td>${user.LastName}</td>
          <td>${user.UserName}</td>
          <td>${user.Email}</td>
          <td>${user.Password}</td>
          <td>${user.TCKN}</td>
          <td>${user.Role.Name}</td>
          <td>${user.createdAt}</td>
          <td>${user.updatedAt}</td>
        `;

        tbody!.appendChild(tr);
      });
    }

    else {
      paginatedData.paginatedData().forEach((doc: any) => {
        tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', () => documentRecordListRowClick(doc.Id, doc.Name, doc.FilePath, doc.Status,
                                                                      doc.CreatedAt, doc.UpdatedAt));

        tr.innerHTML += `
          <td>${doc.Id}</td>
          <td>${doc.Name}</td>
          <td class="columnStatus" style="${doc.Status === 'Onay Bekliyor' ? "color: orange" : (doc.Status === 'Onaylandı' ? "color: green" : "color: red")}">${doc.Status}</td>
          <td>${doc.CreatedAt}</td>
          <td>${doc.UpdatedAt}</td>
        `;

        tbody!.appendChild(tr);
      });
    }
  }

  else if (id === 'divRole') {
    paginatedData.paginatedData().forEach((role: any) => {
      tr = document.createElement('tr');
      td = document.createElement('td');
      linkUpdate = document.createElement('a');
      linkUpdate.classList.add("btn", "me-2", "btnUpdateRole");
      linkUpdate.textContent = "Güncelle";
      linkUpdate.addEventListener("click", () => btnRecordUpdate('roles', 'GetRole', 'roleRecordModal', roleRecordModal.value!, role.Id));
      linkDelete = document.createElement('a');
      linkDelete.classList.add("btn", "btnDeleteRole");
      linkDelete.textContent = "Sil";
      linkDelete.addEventListener("click", () => btnRecordDelete('roles', 'GetRole', role.Id, roleDeleteModal.value!));

      tr.innerHTML += `
        <td>${role.Id}</td>
        <td>${role.Name}</td>
        <td>${role.createdAt}</td>
        <td>${role.updatedAt}</td>
      `;

      if(role.Name === 'ADMIN' || role.Name === 'HR' || role.Name === 'USER') {
        linkUpdate.classList.add("btn-dark", "disabled");
        linkDelete.classList.add("btn-dark", "disabled");
      }

      else {
        linkUpdate.classList.add("btn-primary");
        linkDelete.classList.add("btn-danger");
      }

      td.appendChild(linkUpdate);
      td.appendChild(linkDelete);
      tr.appendChild(td);
      tbody?.appendChild(tr);
    });
  }

  else if (id === 'divCountry') {
    paginatedData.paginatedData().forEach((country: any) => {
      tr = document.createElement('tr');
      td = document.createElement('td');
      linkUpdate = document.createElement('a');
      linkUpdate.classList.add("btn", "me-2", "btn-primary", "btnUpdateCountry");
      linkUpdate.textContent = "Güncelle";
      linkUpdate.addEventListener("click", () => btnRecordUpdate('countries', 'GetCountry', 'countryRecordModal', countryRecordModal.value!, country.Id));
      linkDelete = document.createElement('a');
      linkDelete.classList.add("btn", "btn-danger", "btnDeleteCountry");
      linkDelete.textContent = "Sil";
      linkDelete.addEventListener("click", () => btnRecordDelete('countries', 'GetCountry', country.Id, countryDeleteModal.value!));

      tr.innerHTML += `
        <td>${country.Id}</td>
        <td>${country.Name}</td>
        <td>${country.createdAt}</td>
        <td>${country.updatedAt}</td>
      `;

      td.appendChild(linkUpdate);
      td.appendChild(linkDelete);
      tr.appendChild(td);
      tbody?.appendChild(tr);
    });
  }

  else if (id === 'divCity') {
    paginatedData.paginatedData().forEach((city: any) => {
      tr = document.createElement('tr');
      td = document.createElement('td');
      linkUpdate = document.createElement('a');
      linkUpdate.classList.add("btn", "me-2", "btn-primary", "btnUpdateCity");
      linkUpdate.textContent = "Güncelle";
      linkUpdate.addEventListener("click", () => btnRecordUpdate('cities', 'GetCity', 'cityRecordModal', cityRecordModal.value!, city.Id));
      linkDelete = document.createElement('a');
      linkDelete.classList.add("btn", "btn-danger", "btnDeleteCity");
      linkDelete.textContent = "Sil";
      linkDelete.addEventListener("click", () => btnRecordDelete('cities', 'GetCity', city.Id, cityDeleteModal.value!));

      tr.innerHTML += `
        <td>${city.Id}</td>
        <td>${city.Name}</td>
        <td>${city.Country.Name}</td>
        <td>${city.createdAt}</td>
        <td>${city.updatedAt}</td>
      `;

      td.appendChild(linkUpdate);
      td.appendChild(linkDelete);
      tr.appendChild(td);
      tbody?.appendChild(tr);
    });
  }

  else if (id === 'divDistrict') {
    paginatedData.paginatedData().forEach((district: any) => {
      tr = document.createElement('tr');
      td = document.createElement('td');
      linkUpdate = document.createElement('a');
      linkUpdate.classList.add("btn", "me-2", "btn-primary", "btnUpdateDistrict");
      linkUpdate.textContent = "Güncelle";
      linkUpdate.addEventListener("click", () => btnRecordUpdate('districts', 'GetDistrict', 'districtRecordModal', districtRecordModal.value!, district.Id));
      linkDelete = document.createElement('a');
      linkDelete.classList.add("btn", "btn-danger", "btnDeleteDistrict");
      linkDelete.textContent = "Sil";
      linkDelete.addEventListener("click", () => btnRecordDelete('districts', 'GetDistrict', district.Id, districtDeleteModal.value!));

      tr.innerHTML += `
        <td>${district.Id}</td>
        <td>${district.Name}</td>
        <td>${district.City.Name}</td>
        <td>${district.createdAt}</td>
        <td>${district.updatedAt}</td>
      `;

      td.appendChild(linkUpdate);
      td.appendChild(linkDelete);
      tr.appendChild(td);
      tbody?.appendChild(tr);
    });
  }

  else if (id === 'divDocumentApprove') {
    paginatedData.paginatedData().forEach((doc: any) => {
      tr = document.createElement('tr');
      td = document.createElement('td');
      linkApprove = document.createElement('a');
      linkApprove.classList.add("btn", "p-1", "border-0");
      
      if (doc.Status === 'Onaylandı' || doc.Status === 'Reddedildi') {
        linkApprove.classList.add("disabled");
      }

      linkApprove.innerHTML = `<svg class="svg-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32" style="color: green;">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121 175.1l-143 160c-4.6 5.2-11 8.1-17.6 8.1-6.4 0-12.9-2.7-17.6-8.1l-65-72.9c-8.8-9.8-8.1-25 1.6-33.9s25-8.1 33.9 1.6L216 277.1l125.4-140c8.7-9.7 23.9-10.5 33.9-1.6s10.5 23.9 1.7 33.6z"></path>
                              </svg>`;
      linkApprove.addEventListener("click", () => btnApproveRejectClick(doc.Id, doc.Name, doc.CreatedAt, doc.User.FirstName, doc.User.LastName, doc.User.Email, true));

      linkReject = document.createElement('a');
      linkReject.classList.add("btn", "p-1", "border-0");
      
      if (doc.Status === 'Onaylandı' || doc.Status === 'Reddedildi') {
        linkReject.classList.add("disabled");
      }

      linkReject.innerHTML = `<svg class="svg-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32" style="color: red;">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm113.9 321c12.3 12.3 12.3 32.2 0 44.5s-32.2 12.3-44.5 0L256 300.5l-69.4 69.4c-12.3 12.3-32.2 12.3-44.5 0s-12.3-32.2 0-44.5L211.5 256l-69.4-69.4c-12.3-12.3-12.3-32.2 0-44.5s32.2-12.3 44.5 0L256 211.5l69.4-69.4c12.3-12.3 32.2-12.3 44.5 0s12.3 32.2 0 44.5L300.5 256l69.4 69.4z"></path>
                              </svg>`;
      linkReject.addEventListener("click", () => btnApproveRejectClick(doc.Id, doc.Name, doc.CreatedAt, doc.User.FirstName, doc.User.LastName, doc.User.Email, false));

      linkUndo = document.createElement('a');
      linkUndo.classList.add("btn", "btn-primary", "p-1", "m-1");
      
      if (doc.Status === 'Onaylandı' || doc.Status === 'Reddedildi') {
        linkUndo.classList.add("d-inline-block");
        linkUndo.classList.remove("d-none");
      }

      else {
        linkUndo.classList.add("d-none");
        linkUndo.classList.remove("d-inline-block");
      }

      linkUndo.innerHTML = `<svg class="svg-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rotate-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                              <path fill="currentColor" d="M201.4 91.72c12.2 13.17 11.38 33.38-1.799 45.54L129.8 204.5H256c79.41 0 144 64.59 144 144s-64.59 144-144 144c-74.94 0-136.5-57.38-143.3-131.1-1.91-17.6-17.51-30.26-35.15-28.35-17.59 1.911-30.26 17.52-28.35 35.15C61.27 440.5 151.5 512 256 512c114.7 0 208-93.31 208-208s-93.31-208-208-208H129.8l69.83 67.25c13.17 12.16 14 32.37 1.799 45.54s-32.37 14-45.54 1.799L56.97 129.8C46.64 119.6 46.64 104.4 56.97 94.2l100.8-96c13.17-12.16 33.37-11.38 45.54 1.799z"></path>
                            </svg>`;
      linkUndo.addEventListener("click", () => btnUndoClick(doc.Id, doc.Name, doc.Status === 'Onaylandı'));

      tr.innerHTML += `
        <td>${doc.Id}</td>
        <td>${doc.Name}</td>
        <td>${doc.User.FirstName + ' ' + doc.User.LastName}</td>
        <td>${doc.CreatedAt}</td>
        <td>${doc.UpdatedAt}</td>
        <td>
          <a href="${doc.FilePath}" download="${getFileNameFromPath(doc.FilePath)}" class="btn btn-danger">
            <svg class="svg-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
              <path fill="currentColor" d="M480 320h-64v112H96V320H32c-17.67 0-32 14.33-32 32v112c0 53.02 42.98 96 96 96h320c53.02 0 96-42.98 96-96V352c0-17.67-14.33-32-32-32zm-248.5 7l136-136c12.5-12.5 12.5-32.76 0-45.25s-32.76-12.5-45.25 0L288 210.8V32c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v178.8L189.8 145.7c-12.5-12.5-32.76-12.5-45.25 0s-12.5 32.76 0 45.25l136 136c12.49 12.5 32.75 12.5 45.25.05z"></path>
            </svg>
          </a>
        </td>
        <td class="columnStatus" style="${doc.Status === 'Onay Bekliyor' ? 'color: orange' : (doc.Status === 'Onaylandı' ? 'color: green' : 'color: red')}">${doc.Status}</td>
      `;

      td.appendChild(linkApprove);
      td.appendChild(linkReject);
      td.appendChild(linkUndo);
      tr.append(td);
      tbody!.appendChild(tr);
    });
  }

  pageCount.textContent = paginatedData.totalPages;
}

const btnRecordInsert = (updName: HTMLInputElement, id: string, recordModal: HTMLElement) => {
  debugger;
  RoleId.value = 0;
  RoleName.value = "";
  CountryCodeId.value = "";
  CountryCode.value = "";
  CountryText.value = "";
  CityCodeId.value = "";
  CityCode.value = "";
  CityText.value = "";
  CityCountryCode.value = "";
  popCountryName.value!.value = "";
  DistrictId.value = "";
  DistrictCodeId.value = "";
  DistrictCode.value = "";
  DistrictText.value = "";
  popCityName.value!.value = "";
  updName.value = "";
  const countryRow = document.querySelector<Element>('#countryForm .row:first-of-type');
  const cityRow = document.querySelector<Element>('#cityForm .row:first-of-type');
  const districtRow = document.querySelector<Element>('#districtForm .row:first-of-type');
  ClearModalFormErrors();

  if (id === 'countryRecordModal' && countryRow) {
    countryRow.classList.add("d-flex");
    countryRow.classList.remove("d-none");
  }

  else if (id === 'cityRecordModal' && cityRow) {
    cityRow.classList.add("d-flex");
    cityRow.classList.remove("d-none");
  }

  else if (id === 'districtRecordModal' && districtRow) {
    districtRow.classList.add("d-flex");
    districtRow.classList.remove("d-none");
  }

  const recordModalTitle = document.querySelector<Element>(`#${id} .modal-dialog .modal-content .modal-header .modal-title`);

  if (recordModal) {
    recordModalTitle!.textContent = "Yeni Kayıt";
    recordModal.style.display = "block";
  }
};

const btnRecordUpdate = async (url: string, method: string, divId: string, recordModal: HTMLElement, id: string) => {
  debugger;
  const updatedData = await axios.get(`http://localhost:1337/api/${url}/${method}/${id}`);
  ClearModalFormErrors();

  if(divId === 'roleRecordModal'){
    RoleId.value = updatedData.data.Id;
    RoleName.value = updatedData.data.Name;
  }

  else if(divId === 'countryRecordModal') {
    CountryCodeId.value = updatedData.data.Id;
    CountryCode.value = updatedData.data.Id;
    CountryText.value = updatedData.data.Name;
    document.querySelector('#countryForm .row:first-of-type')!.classList.remove("d-flex");
    document.querySelector('#countryForm .row:first-of-type')!.classList.add("d-none");
  }

  else if(divId === 'cityRecordModal') {
    CityCodeId.value = updatedData.data.Id;
    CityCode.value = updatedData.data.Id;
    CityText.value = updatedData.data.Name;
    CityCountryCode.value = updatedData.data.Country.Id;
    popCountryName.value!.value = updatedData.data.Country.Name;
    document.querySelector('#cityForm .row:first-of-type')!.classList.remove("d-flex");
    document.querySelector('#cityForm .row:first-of-type')!.classList.add("d-none");
  }

  else if(divId === 'districtRecordModal') {
    DistrictCodeId.value = updatedData.data.Id;
    DistrictCode.value = updatedData.data.Id;
    DistrictText.value = updatedData.data.Name;
    DistrictCityCode.value = updatedData.data.City.Id;
    popCityName.value!.value = updatedData.data.City.Name;
    document.querySelector('#districtForm .row:first-of-type')!.classList.remove("d-flex");
    document.querySelector('#districtForm .row:first-of-type')!.classList.add("d-none");
  }

  const recordModalTitle = document.querySelector(`#${divId} .modal-dialog .modal-content .modal-header .modal-title`);

  if (recordModal) {
    if(recordModalTitle) {
      recordModalTitle.textContent = "Güncelle";
    }

    recordModal.style.display = "block";
  }
};

const btnRecordDelete = async (url: string, method: string, id: number, deleteModal: HTMLElement) => {
  debugger;
  if (deleteModal) {
    let deletedData = await axios.get(`http://localhost:1337/api/${url}/${method}/${id}`);

    if(url === 'roles') {
      RoleId.value = id;
      RoleName.value = deletedData.data.Name;
    }

    else if(url === 'users') {
      UserId.value = id;
    }

    else if(url === 'countries') {
      CountryId.value = id.toString();
      CountryName.value = deletedData.data.Name;
    }

    else if(url === 'cities') {
      CityId.value = id.toString();
      CityName.value = deletedData.data.Name;
    }

    else if(url === 'districts') {
      DistrictId.value = id.toString();
      DistrictName.value = deletedData.data.Name;
    }

    deleteModal.style.display = "block";
  }
};

const btnImageSelectClick = () => {
  document.getElementById('imageUpload')!.click();
}

const ClearModalFormErrors = () => {
  debugger;
  const errors = document.getElementsByClassName("error");

  Array.from(errors).forEach((error) => {
    (error as HTMLElement).style.display = "none";
  });
}

const ShowModalFormErrors = () => {
  const errors = document.getElementsByClassName("error");

  Array.from(errors).forEach((error) => {
    (error as HTMLElement).style.display = "block";
  });
}

const btnSaveAsClick = () => {
  UserId.value = 0;
  DocumentId.value = 0;
}

const sortTable = (colIndex: number, tableId: string) => {
  debugger;
  const table = document.getElementById(tableId) as HTMLTableElement;
  const rows = Array.from(table!.rows).slice(1);
  const isAsc = table.dataset.sortAsc === 'true';

  rows.sort((a, b) => {
    const cellA = a?.cells[colIndex]?.textContent?.trim() || '';
    const cellB = b?.cells[colIndex]?.textContent?.trim() || '';
    return isAsc
      ? cellA.localeCompare(cellB, undefined, { numeric: true })
      : cellB.localeCompare(cellA, undefined, { numeric: true });
  });

  table.dataset.sortAsc = (!isAsc).toString();
  rows.forEach(row => table.tBodies[0].appendChild(row));
}

const filterTable = (colIndex: number, triggerElement: HTMLElement, tableId: string) => {
  debugger;
  const modalId = `filter${tableId}`;
  let modalDiv = document.getElementById(modalId);
  const button = document.createElement("button");
  button.innerHTML = "Ara";
  button.classList.add("btn", "btn-primary");
  button.addEventListener("click", () => applyFilter(colIndex, button, tableId, modalId));

  if (!modalDiv) {
    modalDiv = document.createElement("div");
    modalDiv.id = `filter${tableId}`;
    modalDiv.style.zIndex = '2';
    modalDiv.classList.value = "filter-modal d-none";
    modalDiv.innerHTML = `<input type="text" style="border: 1px solid #02558B; border-radius: 5px;"
                            id="filter${tableId}Input${colIndex}" placeholder="Değer girin">`;

    modalDiv.appendChild(button);
    document.body.appendChild(modalDiv);
  }

  else {
    modalDiv.remove();
    modalDiv.innerHTML = `<input type="text" style="border: 1px solid #02558B; border-radius: 5px;"
                            id="filter${tableId}Input${colIndex}" placeholder="Değer girin">`;
    modalDiv.appendChild(button);
    document.body.appendChild(modalDiv);
  }

  const rect = triggerElement.getBoundingClientRect();
  modalDiv.style.position = 'absolute';
  modalDiv.style.top = `${rect.bottom + window.scrollY}px`;
  modalDiv.style.left = `${rect.left}px`;

  if (modalDiv.classList.contains("d-flex")) {
    modalDiv.classList.remove("d-flex");
    modalDiv.classList.add("d-none");
  }

  else {
    modalDiv.classList.remove("d-none");
    modalDiv.classList.add("d-flex");
  }
}

function applyFilter(colIndex: number, buttonElement: any, tableId: string, modalId: string) {
  debugger;
  const input = buttonElement.previousElementSibling.value.toLowerCase();
  const table = document.getElementById(tableId);
  const rows = table!.querySelectorAll<any>("tbody tr");
  const filterModal = document.getElementById(modalId);

  rows.forEach(row => {
    const col = row.cells[colIndex];

    if (col) {
      const colText = col.textContent.toLowerCase();
      row.style.display = colText.includes(input) ? "" : "none";
      filterModal!.classList.remove("d-flex");
      filterModal!.classList.add("d-none");
    }
  });
}

const pageIndexChanged = async (pageIndexInput: HTMLInputElement, pageCountInput: HTMLElement, btnPrevious: HTMLElement, btnNext: HTMLElement, url: string, method: string) => {
  debugger;
  if (pageIndexInput.value !== '') {
    if (Number(pageIndexInput.value) <= 0) {
      pageIndexInput.value = '1';
    }

    if (Number(pageIndexInput.value) > Number(pageCountInput.innerHTML)) {
      pageIndexInput.value = pageCountInput.innerHTML;
    }

    const allData = await axios.get(`http://localhost:1337/api/${url}/${method}`);
    const paginatedData = usePagination(allData.data, pageIndexInput.value);
    checkPreviousAndNextButtons(paginatedData, btnPrevious, btnNext);
    showData(paginatedData, url === 'users' ? 'recordListModal' : url === 'roles' ? 'divRole' : url === 'countries' ? 'divCountry' : url === 'cities' ? 'divCity' : url === 'districts' ? 'divDistrict' : method === 'GetAllDocuments' ? 'divDocumentApprove' : 'recordListModal', pageCountInput);
  }
}

const btnPreviousClick = async (url: string, method: string, pageIndex: HTMLInputElement, pageCount: HTMLElement, btnPrevious: HTMLElement, btnNext: HTMLElement, id: string) => {
  debugger;
  const allData = await axios.get(`http://localhost:1337/api/${url}/${method}`);
  const paginatedData = usePagination(allData.data, pageIndex.value);
  pageIndex.value = (Number(pageIndex.value) - 1).toString();
  paginatedData.changePage(pageIndex.value);

  checkPreviousAndNextButtons(paginatedData, btnPrevious, btnNext);
  showData(paginatedData, id, pageCount);
}

const btnNextClick = async (url: string, method: string, pageIndex: HTMLInputElement, pageCount: HTMLElement, btnPrevious: HTMLElement, btnNext: HTMLElement, id: string) => {
  debugger;
  const allData = await axios.get(`http://localhost:1337/api/${url}/${method}`);
  const paginatedData = usePagination(allData.data, pageIndex.value);
  pageIndex.value = (Number(pageIndex.value) + 1).toString();
  paginatedData.changePage(pageIndex.value);

  checkPreviousAndNextButtons(paginatedData, btnPrevious, btnNext);
  showData(paginatedData, id, pageCount);
}

const createAndFillTable = async (tableId: string, apiUrl: string) => {
  try {
    debugger;
    const response = await axios.get(apiUrl);
    const data = response.data;

    const newTable = document.createElement('table');
    newTable.id = tableId + "Data";
    newTable.className = 'table table-striped';
    const tableHead = document.createElement('thead');

    if (tableId === 'userTable') {
      tableHead.innerHTML = `
        <tr>
          <th>Id</th>
          <th>Resim</th>
          <th>Adı</th>
          <th>Soyadı</th>
          <th>Kullanıcı Adı</th>
          <th>Email</th>
          <th>Parola</th>
          <th>TC Kimlik No</th>
          <th>Rol</th>
          <th>Oluşturulma Tarihi</th>
          <th>Son Güncelleme Tarihi</th>
        </tr>
      `;
    }

    else if (tableId === 'roleTable') {
      tableHead.innerHTML = `
        <tr>
          <th>Id</th>
          <th>Rol Adı</th>
          <th>Oluşturulma Tarihi</th>
          <th>Son Güncelleme Tarihi</th>
        </tr>
      `;
    }

    else if (tableId === 'countryTable') {
      tableHead.innerHTML = `
        <tr>
          <th>Ülke Kodu</th>
          <th>Ülke Adı</th>
          <th>Oluşturulma Tarihi</th>
          <th>Son Güncelleme Tarihi</th>
        </tr>
      `;
    }

    else if (tableId === 'cityTable') {
      tableHead.innerHTML = `
        <tr>
          <th>İl Kodu</th>
          <th>İl Adı</th>
          <th>Ülke</th>
          <th>Oluşturulma Tarihi</th>
          <th>Son Güncelleme Tarihi</th>
        </tr>
      `;
    }

    else if (tableId === 'districtTable') {
      tableHead.innerHTML = `
        <tr>
          <th>İlçe Kodu</th>
          <th>İlçe Adı</th>
          <th>Şehir</th>
          <th>Oluşturulma Tarihi</th>
          <th>Son Güncelleme Tarihi</th>
        </tr>
      `;
    }

    else if(tableId === 'documentTable') {
      tableHead.innerHTML = `
        <tr>
          <th>Id</th>
          <th>Evrak Adı</th>
          <th>Durumu</th>
          <th>Oluşturulma Tarihi</th>
          <th>Son Güncelleme Tarihi</th>
        </tr>
      `;
    }

    else if(tableId === 'documentApproveTable') {
      tableHead.innerHTML = `
        <tr>
          <th>Id</th>
          <th>Evrak Adı</th>
          <th>Kullanıcı</th>
          <th>Yüklenme Tarihi</th>
          <th>Son Güncelleme Tarihi</th>
          <th>Durumu</th>
        </tr>
      `;
    }

    newTable.appendChild(tableHead);
    const tableBody = document.createElement('tbody');

    data.forEach((item: any) => {
      const row = document.createElement('tr');

      if (tableId === 'userTable') {
        row.innerHTML = `
          <td>${item.Id}</td>
          <td><img src="${item.ImagePath != null ? item.ImagePath : item.Gender === 'Erkek' ? '/assets/img/Man.png' : '/assets/img/Woman.png'}" style="width: 100px; height: 100px;" alt=""></td>
          <td>${item.FirstName}</td>
          <td>${item.LastName}</td>
          <td>${item.UserName}</td>
          <td>${item.Email}</td>
          <td>${item.Password}</td>
          <td>${item.TCKN}</td>
          <td>${item.Role.Name}</td>
          <td>${item.createdAt}</td>
          <td>${item.updatedAt}</td>
        `;
      }

      else if (tableId === 'roleTable') {
        row.innerHTML = `
          <td>${item.Id}</td>
          <td>${item.Name}</td>
          <td>${item.createdAt}</td>
          <td>${item.updatedAt}</td>
        `;
      }

      else if (tableId === 'countryTable') {
        row.innerHTML = `
          <td>${item.Id}</td>
          <td>${item.Name}</td>
          <td>${item.createdAt}</td>
          <td>${item.updatedAt}</td>
        `;
      }

      else if (tableId === 'cityTable') {
        row.innerHTML = `
          <td>${item.Id}</td>
          <td>${item.Name}</td>
          <td>${item.Country.Name}</td>
          <td>${item.createdAt}</td>
          <td>${item.updatedAt}</td>
        `;
      }

      else if (tableId === 'districtTable') {
        row.innerHTML = `
          <td>${item.Id}</td>
          <td>${item.Name}</td>
          <td>${item.City.Name}</td>
          <td>${item.createdAt}</td>
          <td>${item.updatedAt}</td>
        `;
      }

      else if(tableId === 'documentTable') {
        row.innerHTML = `
          <td>${item.Id}</td>
          <td>${item.Name}</td>
          <td>${item.Status}</td>
          <td>${item.CreatedAt}</td>
          <td>${item.UpdatedAt}</td>
        `;
      }

      else if(tableId === 'documentApproveTable') {
        row.innerHTML = `
          <td>${item.Id}</td>
          <td>${item.Name}</td>
          <td>${item.User.FirstName + ' ' + item.User.LastName}</td>
          <td>${item.CreatedAt}</td>
          <td>${item.UpdatedAt}</td>
          <td>${item.Status}</td>
        `;
      }

      tableBody.appendChild(row);
    });

    newTable.appendChild(tableBody);
    const container = document.createElement('div');
    container.style.display = "none";

    if (container) {
      container.appendChild(newTable);
      document.body.appendChild(container);
    } else {
      console.error('No container found to append the table.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const DownloadPdf = async (tableId: string, url: string, method: string) => {
  debugger;
  await createAndFillTable(tableId, `http://localhost:1337/api/${url}/${method}`);
  const element = document.getElementById(tableId + 'Data');

  const options = {
    width: 1200,
    margin: 1,
    filename: tableId === 'userTable' ? 'Users.pdf' : tableId === 'roleTable' ? 'Roles.pdf' : tableId === 'countryTable' ? 'Countries.pdf' : tableId === 'cityTable' ? 'Cities.pdf' : tableId === 'districtTable' ? 'Districts.pdf' : tableId === 'documentApproveTable' ? 'DocumentApproves.pdf' : tableId === 'documentTable' ? 'Document.pdf' : tableId === 'dictionaryTable' ? 'Dictionaries.pdf' : '',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      windowWidth: document.body.scrollWidth,
      windowHeight: document.body.scrollHeight
    },
    jsPDF: {
      unit: 'mm',
      format: ['297', '420'],
      orientation: 'landscape'
    }
  };

  const html2pdf = await $html2pdf();
  await html2pdf().set(options).from(element).save();
}

const DownloadExcel = async (tableId: string, url: string, method: string) => {
  debugger;
  await createAndFillTable(tableId, `http://localhost:1337/api/${url}/${method}`);
  const table = document.getElementById(tableId + 'Data');
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.table_to_sheet(table);

  const images = table!.querySelectorAll('img');

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const imageUrl = img.src;

    const cellAddress = `B${i + 2}`;

    ws[cellAddress] = {
      t: 's',
      v: 'Image Link',
      l: { Target: imageUrl },
    };
  }

  xlsx.utils.book_append_sheet(wb, ws, 'Tablo');
  xlsx.writeFile(wb, tableId === 'userTable' ? 'Users.xlsx' : tableId === 'roleTable' ? 'Roles.xlsx' : tableId === 'countryTable' ? 'Countries.xlsx' : tableId === 'cityTable' ? 'Cities.xlsx' : tableId === 'districtTable' ? 'Districts.xlsx' : tableId === 'documentApproveTable' ? 'DocumentApproves.xlsx' : tableId === 'documentTable' ? 'Document.xlsx' : tableId === 'dictionaryTable' ? 'Dictionaries.xlsx' : '');
}

const DownloadWord = async (tableId: string, url: string, method: string) => {
  debugger;
  await createAndFillTable(tableId, `http://localhost:1337/api/${url}/${method}`);
  const table = document.getElementById(tableId + 'Data');

  const html = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40' lang="">
    <head>
      <meta charset='utf-8'>
      <title>${tableId === 'userTable' ? 'Kullanıcılar' : ''}</title>
      <style>
        @page {
          size: 16.54in 11.69in;
          margin: 20mm 20mm 20mm 20mm;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        th, td {
          padding: 5px;
          text-align: left;
          border: 1px solid black;
          word-wrap: break-word;
        }
        img {
          max-width: 100px;
          max-height: 100px;
        }
      </style>
    </head>
    <body>${table!.outerHTML}</body>
  </html>`;

  const blob = new Blob(['\ufeff', html], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const objUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objUrl;
  link.download = tableId === 'userTable' ? 'Users.doc' : tableId === 'roleTable' ? 'Roles.doc' : tableId === 'countryTable' ? 'Countries.doc' : tableId === 'cityTable' ? 'Cities.doc' : tableId === 'districtTable' ? 'Districts.doc' : tableId === 'documentApproveTable' ? 'DocumentApproves.doc' : tableId === 'documentTable' ? 'Document.doc' : tableId === 'dictionaryTable' ? 'Dictionaries.doc' : '';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// User Model
let UserId = ref(0);
const FirstName = ref("");
const LastName = ref("");
const UserName = ref("");
const Email = ref("");
const Password = ref("");
let UserCreatedAt = ref("");
let UserUpdatedAt = ref("");
const SerialNumber = ref("");
const MotherName = ref("");
const FatherName = ref("");
const BirthDate = ref("");
const Gender = ref("");
const CivilStatus = ref("");
const EmploymentDate = ref("");
const MilitaryStatus = ref("");
const PostponementDate = ref("");
const CountryId = ref("");
const CityId = ref("");
const DistrictId = ref("");
const Address = ref("");
let UserIsDeleted = false;

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

// Country Model
let CountryCodeId = ref("");
let CountryCode = ref("");
const CountryText = ref("");

// City Model
let CityCodeId = ref("");
let CityCode = ref("");
const CityText = ref("");
const CityCountryCode = ref("");

// District Model
let DistrictCodeId = ref("");
let DistrictCode = ref("");
const DistrictText = ref("");
const DistrictCityCode = ref("");

const userRules = {
  FirstName: { required },
  LastName: { required },
  UserName: { required },
  Email: { required },
  Password: { required },
  selectedRole: { required },
  SerialNumber: { required },
  MotherName: { required },
  FatherName: { required },
  BirthDate: { required },
  Gender: { required },
  CivilStatus: { required },
  EmploymentDate: { required },
  MilitaryStatus: { required: false },
  PostponementDate: { required: () => MilitaryStatus.value.trim() !== 'P' || PostponementDate.value !== '' ? true : false },
  CountryId: { required },
  CityId: { required },
  DistrictId: { required },
  Address: { required }
};

const roleRules = {
  RoleName: { required },
};

const countryRules = {
  CountryCode: { required },
  CountryText: { required }
};

const cityRules = {
  CityCode: { required },
  CityText: { required },
  CityCountryCode: { required }
};

const districtRules = {
  DistrictCode: { required },
  DistrictText: { required },
  DistrictCityCode: { required }
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
  SerialNumber,
  MotherName,
  FatherName,
  BirthDate,
  Gender,
  CivilStatus,
  EmploymentDate,
  MilitaryStatus,
  PostponementDate,
  CountryId,
  CityId,
  DistrictId,
  Address
});

const vRole$ = useVuelidate(roleRules, {
  RoleName,
});

const vDocument$ = useVuelidate(documentRules, {
  DocumentName,
  FilePath,
});

const vCountry$ = useVuelidate(countryRules, {
  CountryCode,
  CountryText,
});

const vCity$ = useVuelidate(cityRules, {
  CityCode,
  CityText,
  CityCountryCode
});

const vDistrict$ = useVuelidate(districtRules, {
  DistrictCode,
  DistrictText,
  DistrictCityCode
});

const UserSubmit = async () => {
  debugger;
  vUser$.value.$validate();
  console.log(MilitaryStatus.value.trim() !== 'P');
  console.log("Required :" + userRules.PostponementDate.required);
  
  let res;

  if (!vUser$.value.$invalid) {
    if (UserIsDeleted) {
      const res = await axios.delete(
        `http://localhost:1337/api/users/DeleteUser/${UserId.value}`
      );

      SetInfoMessageTitle(res);
      infoMessage.value = res.data.message;

      if(infoModal.value) {
        infoModal.value.style.display = "block";
      }

      ClearUserForm();
      SetInfoMessageTitle(res);
      infoMessage.value = res.data.message;
      infoModal.value!.style.display = "block";
      const allUsers = await axios.get("http://localhost:1337/api/users/GetAllUsers");
      const paginatedUserData = usePagination(allUsers.data, userPageIndex.value!.value);
      checkPreviousAndNextButtons(paginatedUserData, btnPreviousUser.value!, btnNextUser.value!);
      userPageCount.value!.textContent = Math.ceil(allUsers.data.length / paginatedUserData.pageSize).toString();
      showData(paginatedUserData, 'recordListModal', userPageCount.value!);
    } else {
      if (UserId.value == 0) {
        res = await axios.post("http://localhost:1337/api/users/CreateUser", {
          FirstName: FirstName.value,
          LastName: LastName.value,
          UserName: UserName.value,
          Email: Email.value,
          Password: Password.value,
          RoleId: selectedRole.value,
          ImagePath: ImageFilePath.value == '' ? null : ImageFilePath.value,
          TCKN: SerialNumber.value,
          MotherName: MotherName.value,
          FatherName: FatherName.value,
          BirthDate: BirthDate.value,
          Gender: Gender.value,
          CivilStatus: CivilStatus.value,
          EmploymentDate: EmploymentDate.value,
          MilitaryStatus: MilitaryStatus.value,
          PostponementDate: PostponementDate.value,
          CountryId: CountryId.value,
          CityId: CityId.value,
          DistrictId: DistrictId.value,
          Address: Address.value
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
          ImagePath: ImageFilePath.value == '' ? null : ImageFilePath.value,
          TCKN: SerialNumber.value,
          MotherName: MotherName.value,
          FatherName: FatherName.value,
          BirthDate: BirthDate.value,
          Gender: Gender.value,
          CivilStatus: CivilStatus.value,
          EmploymentDate: EmploymentDate.value,
          MilitaryStatus: MilitaryStatus.value,
          PostponementDate: PostponementDate.value,
          CountryId: CountryId.value,
          CityId: CityId.value,
          DistrictId: DistrictId.value,
          Address: Address.value
        });
      }

      SetInfoModalContent(res);
      ClearUserForm();
      await UploadImage();
      infoModal.value!.style.display = "block";
      const allUsers = await axios.get("http://localhost:1337/api/users/GetAllUsers");
      const paginatedUserData = usePagination(allUsers.data, userPageIndex.value!.value);
      checkPreviousAndNextButtons(paginatedUserData, btnPreviousUser.value!, btnNextUser.value!);
      userPageCount.value!.textContent = Math.ceil(allUsers.data.length / paginatedUserData.pageSize).toString();
      showData(paginatedUserData, 'recordListModal', userPageCount.value!);
    }
  }

  else {
    ShowModalFormErrors();
  }
};

const RoleSubmit = async () => {
  debugger;
  vRole$.value.$validate();
  let res;

  if (!vRole$.value.$invalid) {
    let allRoles;

    if (RoleId.value == 0) {
      res = await axios.post("http://localhost:1337/api/roles/CreateRole", {
        Id: RoleId.value,
        Name: RoleName.value,
      });

      allRoles = await axios.get("http://localhost:1337/api/roles/GetAllRoles");
      rolePageIndex.value!.value = Math.ceil(allRoles.data.length / 5).toString();
    } else {
      res = await axios.put("http://localhost:1337/api/roles/EditRole", {
        Id: RoleId.value,
        Name: RoleName.value,
        updatedAt: RoleUpdatedAt.value,
      });

      allRoles = await axios.get("http://localhost:1337/api/roles/GetAllRoles");
    }

    SetInfoModalContent(res);

    if(roleRecordModal.value && infoModal.value) {
      roleRecordModal.value.style.display = "none";
      infoModal.value.style.display = "block";
    }

    const paginatedRoleData = usePagination(allRoles.data, rolePageIndex.value!.value);
    checkPreviousAndNextButtons(paginatedRoleData, btnPreviousRole.value!, btnNextRole.value!);
    rolePageCount.value!.textContent = Math.ceil(allRoles.data.length / paginatedRoleData.pageSize).toString();
    showData(paginatedRoleData, 'divRole', rolePageCount.value!);
  }

  else {
    ShowModalFormErrors();
  }
};

const DocumentSubmit = async () => {
  debugger;
  vDocument$.value.$validate();
  let res;

  if (!vDocument$.value.$invalid) {
    if (DocumentIsDeleted.value) {
      const res = await axios.delete(
        `http://localhost:1337/api/documents/DeleteDocument/${DocumentId.value}`
      );

      SetInfoMessageTitle(res);
      infoMessage.value = res.data.message;

      if(infoModal.value){
        infoModal.value.style.display = "block";
      }
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

    if(roleRecordModal.value && infoModal.value) {
      roleRecordModal.value.style.display = "none";
      infoModal.value.style.display = "block";
    }
  }

  else {
    ShowModalFormErrors();
  }
};

const CountrySubmit = async () => {
  debugger;
  const countryId = CountryCodeId.value;
  const countryCode = CountryCode.value;
  const countryName = CountryText.value;
  vCountry$.value.$validate();
  let res;

  if (!vCountry$.value.$invalid) {
    let allCountries;

    if (countryId == "") {
      res = await axios.post("http://localhost:1337/api/countries/CreateCountry", {
        Id: countryCode,
        Name: countryName,
      });

      allCountries = await axios.get("http://localhost:1337/api/countries/GetAllCountries");
      countryPageIndex.value!.value = Math.ceil(allCountries.data.length / 5).toString();
    } else {
      res = await axios.put("http://localhost:1337/api/countries/EditCountry", {
        Id: countryCode,
        Name: countryName
      });

      allCountries = await axios.get("http://localhost:1337/api/countries/GetAllCountries");
    }

    SetInfoModalContent(res);
    ClearCountryForm();

    if(countryRecordModal.value && infoModal.value) {
      countryRecordModal.value.style.display = "none";
      infoModal.value.style.display = "block";
    }

    const paginatedCountryData = usePagination(allCountries.data, countryPageIndex.value!.value);
    checkPreviousAndNextButtons(paginatedCountryData, btnPreviousCountry.value!, btnNextCountry.value!);
    countryPageCount.value!.textContent = Math.ceil(allCountries.data.length / paginatedCountryData.pageSize).toString();
    showData(paginatedCountryData, 'divCountry', countryPageCount.value!);
  }

  else {
    ShowModalFormErrors();
  }
}

const CitySubmit = async () => {
  const cityId = CityCodeId.value;
  const cityCode = CityCode.value;
  const cityName = CityText.value;
  const countryId = CityCountryCode.value;
  vCity$.value.$validate();
  let res;

  if (!vCity$.value.$invalid) {
    let allCities;

    if (cityId == "") {
      res = await axios.post("http://localhost:1337/api/cities/CreateCity", {
        Id: cityCode,
        Name: cityName,
        CountryId: countryId
      });

      allCities = await axios.get("http://localhost:1337/api/cities/GetAllCities");
      cityPageIndex.value!.value = Math.ceil(allCities.data.length / 5).toString();
    } else {
      res = await axios.put("http://localhost:1337/api/cities/EditCity", {
        Id: cityCode,
        Name: cityName,
        CountryId: countryId
      });

      allCities = await axios.get("http://localhost:1337/api/cities/GetAllCities");
    }

    SetInfoModalContent(res);
    ClearCityForm();

    if(cityRecordModal.value && infoModal.value) {
      cityRecordModal.value.style.display = "none";
      infoModal.value.style.display = "block";
    }

    const paginatedCityData = usePagination(allCities.data, cityPageIndex.value!.value);
    checkPreviousAndNextButtons(paginatedCityData, btnPreviousCity.value!, btnNextCity.value!);
    cityPageCount.value!.textContent = Math.ceil(allCities.data.length / paginatedCityData.pageSize).toString();
    showData(paginatedCityData, 'divCity', cityPageCount.value!);
  }

  else {
    ShowModalFormErrors();
  }
}

const DistrictSubmit = async () => {
  const districtId = DistrictCodeId.value;
  const districtCode = DistrictCode.value;
  const districtName = DistrictText.value;
  const cityId = DistrictCityCode.value;
  vDistrict$.value.$validate();
  let res;

  if (!vDistrict$.value.$invalid) {
    let allDistricts;

    if (districtId == "") {
      res = await axios.post("http://localhost:1337/api/districts/CreateDistrict", {
        Id: districtCode,
        Name: districtName,
        CityId: cityId
      });

      allDistricts = await axios.get("http://localhost:1337/api/districts/GetAllDistricts");
      districtPageIndex.value!.value = Math.ceil(allDistricts.data.length / 5).toString();
    } else {
      res = await axios.put("http://localhost:1337/api/districts/EditDistrict", {
        Id: districtCode,
        Name: districtName,
        CityId: cityId
      });

      allDistricts = await axios.get("http://localhost:1337/api/districts/GetAllDistricts");
    }

    SetInfoModalContent(res);
    ClearDistrictForm();

    if(districtRecordModal.value && infoModal.value) {
      districtRecordModal.value.style.display = "none";
      infoModal.value!.style.display = "block";
    }

    const paginatedDistrictData = usePagination(allDistricts.data, districtPageIndex.value!.value);
    checkPreviousAndNextButtons(paginatedDistrictData, btnPreviousDistrict.value!, btnNextDistrict.value!);
    districtPageCount.value!.textContent = Math.ceil(allDistricts.data.length / paginatedDistrictData.pageSize).toString();
    showData(paginatedDistrictData, 'divDistrict', districtPageCount.value!);
  }

  else {
    ShowModalFormErrors();
  }
}

const ClearUserForm = () => {
  debugger;
  UserId.value = 0;
  UserIsDeleted = false;
  FirstName.value = "";
  LastName.value = "";
  UserName.value = "";
  Email.value = "";
  Password.value = "";
  selectedRole.value = "1";
  SerialNumber.value = "";
  MotherName.value = "";
  FatherName.value = "";
  BirthDate.value = "";
  Gender.value = "E";
  CivilStatus.value = "Evli";
  EmploymentDate.value = "";
  MilitaryStatus.value = "";
  PostponementDate.value = "";
  const lblPostponementDate = document.getElementById('lblPostponementDate');
  lblPostponementDate!.style.display = "none";
  postponementDate.value!.style.display = "none";
  CountryId.value = "";
  countryName.value!.value = "";
  CityId.value = "";
  cityName.value!.value = "";
  DistrictId.value = "";
  districtName.value!.value = "";
  Address.value = "";
  UserCreatedAt.value = "";
  UserUpdatedAt.value = "";
  ImageFilePath.value = "";
  uploadPreview.value!.innerHTML = "";
}

const ClearCountryForm = () => {
  CountryCode.value = "";
  CountryText.value = "";
}

const ClearCityForm = () => {
  CityCode.value = "";
  CityText.value = "";
  CityCountryCode.value = "";
  popCountryName.value!.value = "";
}

const ClearDistrictForm = () => {
  DistrictCode.value = "";
  DistrictText.value = "";
  DistrictCityCode.value = "";
  popCityName.value!.value = "";
}

const UploadImage = async () => {
  debugger;
  if (selectedFile) {
    const formData = new FormData();
    formData.append("file", selectedFile.value!);
    formData.append("directoryName", 'img');

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      console.log("Upload result:", result);
    } catch (error) {
      console.error("Upload error:", error);
    }
  }
};

const ClearImage = () => {
  if (uploadPreview.value) {
    uploadPreview.value.innerHTML = '';
  }

  ImageFilePath.value = '';
}

const btnSearchClick = async (searchType: string) => {
  debugger;
  const allCountries = await axios.get('http://localhost:1337/api/countries/GetAllCountries');
  const allCities = await axios.get('http://localhost:1337/api/cities/GetAllCities');
  let allCitiesByCountryId;
  let allDistrictsByCityId;

  if (countryId.value !== null && countryId.value.value != '') {
    allCitiesByCountryId = await axios.get('http://localhost:1337/api/cities/GetAllCitiesByCountryId/' + countryId.value.value);
  }

  if (cityId.value !== null && cityId.value.value != '') {
    allDistrictsByCityId = await axios.get('http://localhost:1337/api/districts/GetAllDistrictsByCityId/' + cityId.value.value);
  }

  const tbody = document.querySelector<HTMLTableSectionElement>("#searchListModal table tbody");

  if (tbody) {
    tbody.innerHTML = "";
  }

  if (searchType === "Country") {
    if (!allCountries.data || allCountries.data.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = "Listelenecek bir kayıt bulunamadı.";
      td.colSpan = 2;
      tr.appendChild(td);
      tbody?.appendChild(tr);
    }

    allCountries.data.forEach((item: any) => {
      const tr = document.createElement("tr");
      tr.style.cursor = "pointer";

      tr.addEventListener("click", () => {
        if (countryId.value && countryName.value && searchListModal.value) {
          CountryId.value = item.Id;
          countryName.value.value = item.Name;
          searchListModal.value.style.display = "none";
        }
      });

      const codeColumn = document.createElement("td");
      codeColumn.textContent = item.Id;
      tr.appendChild(codeColumn);

      const nameColumn = document.createElement("td");
      nameColumn.textContent = item.Name;
      tr.appendChild(nameColumn);
      tbody?.appendChild(tr);
    });
  }

  else if (searchType === "City") {
    if (allCitiesByCountryId !== undefined) {
      if (!allCitiesByCountryId.data || allCitiesByCountryId.data.length === 0) {
        ShowEmptyRow(tbody);
      }

      allCitiesByCountryId.data.forEach((item: any) => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";

        tr.addEventListener("click", () => {
          if (cityId.value && cityName.value && searchListModal.value) {
            CityId.value = item.Id;
            cityName.value.value = item.Name;
            searchListModal.value.style.display = "none";
          }
        });

        const codeColumn = document.createElement("td");
        codeColumn.textContent = item.Id;
        tr.appendChild(codeColumn);

        const nameColumn = document.createElement("td");
        nameColumn.textContent = item.Name;
        tr.appendChild(nameColumn);

        tbody?.appendChild(tr);
      });
    }

    else {
      ShowEmptyRow(tbody);
    }
  }

  else if (searchType === "District") {
    if (allDistrictsByCityId !== undefined) {
      if (!allDistrictsByCityId.data || allDistrictsByCityId.data.length === 0) {
        ShowEmptyRow(tbody);
      }

      allDistrictsByCityId.data.forEach((item: any) => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";

        tr.addEventListener("click", () => {
          if (districtId.value && districtName.value && searchListModal.value) {
            DistrictId.value = item.Id;
            districtName.value.value = item.Name;
            searchListModal.value.style.display = "none";
          }
        });

        const codeColumn = document.createElement("td");
        codeColumn.textContent = item.Id;
        tr.appendChild(codeColumn);

        const nameColumn = document.createElement("td");
        nameColumn.textContent = item.Name;
        tr.appendChild(nameColumn);

        tbody?.appendChild(tr);
      });
    }

    else {
      ShowEmptyRow(tbody);
    }
  }

  else if (searchType === "CityCountry") {
    if (!allCountries.data || allCountries.data.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = "Listelenecek bir kayıt bulunamadı.";
      td.colSpan = 2;
      tr.appendChild(td);
      tbody?.appendChild(tr);
    }

    allCountries.data.forEach((item: any) => {
      const tr = document.createElement("tr");
      tr.style.cursor = "pointer";

      tr.addEventListener("click", () => {
        if (popCountryName.value && searchListModal.value) {
          CityCountryCode.value = item.Id;
          popCountryName.value.value = item.Name;
          searchListModal.value.style.display = "none";
        }
      });

      const codeColumn = document.createElement("td");
      codeColumn.textContent = item.Id;
      tr.appendChild(codeColumn);

      const nameColumn = document.createElement("td");
      nameColumn.textContent = item.Name;
      tr.appendChild(nameColumn);

      tbody?.appendChild(tr);
    });
  }

  else if (searchType === "DistrictCity") {
    if (!allCities.data || allCities.data.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = "Listelenecek bir kayıt bulunamadı.";
      td.colSpan = 2;
      tr.appendChild(td);
      tbody?.appendChild(tr);
    }

    allCities.data.forEach((item: any) => {
      const tr = document.createElement("tr");
      tr.style.cursor = "pointer";

      tr.addEventListener("click", () => {
        if (popCityName.value && searchListModal.value) {
          DistrictCityCode.value = item.Id;
          popCityName.value.value = item.Name;
          searchListModal.value.style.display = "none";
        }
      });

      const codeColumn = document.createElement("td");
      codeColumn.textContent = item.Id;
      tr.appendChild(codeColumn);

      const nameColumn = document.createElement("td");
      nameColumn.textContent = item.Name;
      tr.appendChild(nameColumn);

      tbody?.appendChild(tr);
    });
  }

  if (searchListModal.value) {
    searchListModal.value.style.display = "block";
  }
}

const btnSearchClearClick = (searchType: string) => {
  if (searchType === "Country" && countryId.value && countryName.value && cityId.value && cityName.value && districtId.value && districtName.value) {
    CountryId.value = "";
    countryId.value.value = "";
    countryName.value.value = "";
    CityId.value = "";
    cityId.value.value = "";
    cityName.value.value = "";
    DistrictId.value = "";
    districtId.value.value = "";
    districtName.value.value = "";
  }

  else if (searchType === "City" && cityId.value && cityName.value && districtId.value && districtName.value) {
    CityId.value = "";
    cityId.value.value = "";
    cityName.value.value = "";
    DistrictId.value = "";
    districtId.value.value = "";
    districtName.value.value = "";
  }

  else if (searchType === "District" && districtId.value && districtName.value) {
    DistrictId.value = "";
    districtId.value.value = "";
    districtName.value.value = "";
  }

  else if (searchType === "CityCountry" && updCountryId.value && popCountryName.value) {
    CityCountryCode.value = "";
    updCountryId.value.value = "";
    popCountryName.value.value = "";
  }

  else if (searchType === "DistrictCity" && updCityId.value && popCityName.value) {
    DistrictCityCode.value = "";
    updCityId.value.value = "";
    popCityName.value.value = "";
  }
}

const btnCloseSearchClick = () => {
  if(searchListModal.value) {
    searchListModal.value.style.display = "none";
  }
};

const ShowEmptyRow = (tbody: any) => {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.textContent = "Listelenecek bir kayıt bulunamadı.";
  td.colSpan = 2;
  tr.appendChild(td);
  tbody.appendChild(tr);
}

const btnDeleteYesClick = async (url: string, method: string, id: string, modal: any) => {
  debugger;
  debugger;
  let res = await axios.delete(
    `http://localhost:1337/api/${url}/${method}/${id}`
  );

  modal.style.display = "none";
  infoMessageTitle.value = "Bilgi";
  infoMessage.value = res.data.message;
  infoModal.value!.style.display = "block";

  if (url === 'roles' && rolePageIndex.value && rolePageCount.value && btnPreviousRole.value && btnNextRole.value) {
    rolePageIndex.value.value = '1';
    let allRoles = await axios.get(`http://localhost:1337/api/roles/GetAllRoles`);
    const paginatedData = usePagination(allRoles.data, rolePageIndex.value.value);
    checkPreviousAndNextButtons(paginatedData, btnPreviousRole.value, btnNextRole.value);
    rolePageCount.value.textContent = Math.ceil(allRoles.data.length / paginatedData.pageSize).toString();
    showData(paginatedData, 'divRole', rolePageCount.value);
  }

  else if (url === 'countries' && countryPageIndex.value && countryPageCount.value && btnPreviousCountry.value && btnNextCountry.value) {
    countryPageIndex.value.value = '1';
    let allCountries = await axios.get(`http://localhost:1337/api/countries/GetAllCountries`);
    const paginatedData = usePagination(allCountries.data, countryPageIndex.value.value);
    checkPreviousAndNextButtons(paginatedData, btnPreviousCountry.value, btnNextCountry.value);
    countryPageCount.value.textContent = Math.ceil(allCountries.data.length / paginatedData.pageSize).toString();
    showData(paginatedData, 'divCountry', countryPageCount.value);
  }

  else if (url === 'cities' && cityPageIndex.value && cityPageCount.value && btnPreviousCity.value && btnNextCity.value) {
    cityPageIndex.value.value = '1';
    let allCities = await axios.get(`http://localhost:1337/api/cities/GetAllCities`);
    const paginatedData = usePagination(allCities.data, cityPageIndex.value.value);
    checkPreviousAndNextButtons(paginatedData, btnPreviousCity.value, btnNextCity.value);
    cityPageCount.value.textContent = Math.ceil(allCities.data.length / paginatedData.pageSize).toString();
    showData(paginatedData, 'divCity', cityPageCount.value);
  }

  else if (url === 'districts' && districtPageIndex.value && districtPageCount.value && btnPreviousDistrict.value && btnNextDistrict.value) {
    districtPageIndex.value.value = '1';
    let allDistricts = await axios.get(`http://localhost:1337/api/districts/GetAllDistricts`);
    const paginatedData = usePagination(allDistricts.data, districtPageIndex.value.value);
    checkPreviousAndNextButtons(paginatedData, btnPreviousDistrict.value, btnNextDistrict.value);
    districtPageCount.value.textContent = Math.ceil(allDistricts.data.length / paginatedData.pageSize).toString();
    showData(paginatedData, 'divDistrict', districtPageCount.value);
  }
};

const btnDeleteCancelClick = (modal: HTMLElement) => {
  modal.style.display = "none";
};

const btnUsersClick = () => {
  if (btnUser.value && btnRole.value && btnCountry.value && btnCity.value && btnDistrict.value && divUser.value && divRole.value && divCountry.value && divCity.value && divDistrict.value && divProfile.value) {
    btnUser.value.classList.add("active");
    btnRole.value.classList.remove("active");
    btnCountry.value.classList.remove("active");
    btnCity.value.classList.remove("active");
    btnDistrict.value.classList.remove("active");
    divUser.value.style.display = "block";
    divRole.value.style.display = "none";
    divCountry.value.style.display = "none";
    divCity.value.style.display = "none";
    divDistrict.value.style.display = "none";
    divProfile.value.style.display = "none";
  }
};

const btnRolesClick = () => {
  if (btnUser.value && btnRole.value && btnCountry.value && btnCity.value && btnDistrict.value && divUser.value && divRole.value && divCountry.value && divCity.value && divDistrict.value && divProfile.value) {
    btnUser.value.classList.remove("active");
    btnRole.value.classList.add("active");
    btnCountry.value.classList.remove("active");
    btnCity.value.classList.remove("active");
    btnDistrict.value.classList.remove("active");
    divUser.value.style.display = "none";
    divRole.value.style.display = "block";
    divCountry.value.style.display = "none";
    divCity.value.style.display = "none";
    divDistrict.value.style.display = "none";
    divProfile.value.style.display = "none";
  }
};

const btnCountryClick = () => {
  if (btnUser.value && btnRole.value && btnCountry.value && btnCity.value && btnDistrict.value && divUser.value && divRole.value && divCountry.value && divCity.value && divDistrict.value && divProfile.value) {
    btnUser.value.classList.remove("active");
    btnRole.value.classList.remove("active");
    btnCountry.value.classList.add("active");
    btnCity.value.classList.remove("active");
    btnDistrict.value.classList.remove("active");
    divUser.value.style.display = "none";
    divRole.value.style.display = "none";
    divCountry.value.style.display = "block";
    divCity.value.style.display = "none";
    divDistrict.value.style.display = "none";
    divProfile.value.style.display = "none";
  }
};

const btnCityClick = () => {
  if (btnUser.value && btnRole.value && btnCountry.value && btnCity.value && btnDistrict.value && divUser.value && divRole.value && divCountry.value && divCity.value && divDistrict.value && divProfile.value) {
    btnUser.value.classList.remove("active");
    btnRole.value.classList.remove("active");
    btnCountry.value.classList.remove("active");
    btnCity.value.classList.add("active");
    btnDistrict.value.classList.remove("active");
    divUser.value.style.display = "none";
    divRole.value.style.display = "none";
    divCountry.value.style.display = "none";
    divCity.value.style.display = "block";
    divDistrict.value.style.display = "none";
    divProfile.value.style.display = "none";
  }
};

const btnDistrictClick = () => {
  if (btnUser.value && btnRole.value && btnCountry.value && btnCity.value && btnDistrict.value && divUser.value && divRole.value && divCountry.value && divCity.value && divDistrict.value && divProfile.value) {
    btnUser.value.classList.remove("active");
    btnRole.value.classList.remove("active");
    btnCountry.value.classList.remove("active");
    btnCity.value.classList.remove("active");
    btnDistrict.value.classList.add("active");
    divUser.value.style.display = "none";
    divRole.value.style.display = "none";
    divCountry.value.style.display = "none";
    divCity.value.style.display = "none";
    divDistrict.value.style.display = "block";
    divProfile.value.style.display = "none";
  }
};

const btnProfileClick = () => {
  debugger;
  if(roleName.value == 'ADMIN') {
    if (divUser.value && divRole.value && divCountry.value && divCity.value && divDistrict.value && divProfile.value) {
      divUser.value.style.display = "none";
      divRole.value.style.display = "none";
      divCountry.value.style.display = "none";
      divCity.value.style.display = "none";
      divDistrict.value.style.display = "none";
      divProfile.value.style.display = "block";
    }
  }
  
  else if(roleName.value == 'USER') {
    if(divLoadDocument.value && divProfile.value){
      divLoadDocument.value.style.display = "none";
      divProfile.value.style.display = "block";
    }
  }

  else {
    if (divDocumentApprove.value && divProfile.value) {
      divDocumentApprove.value.style.display = "none";
      divProfile.value.style.display = "block";
    }
  }
}

const btnOkClick = () => {
  ClearModalFormErrors();

  if(infoModal.value){
    infoModal.value.style.display = "none";
  }

  if(roleName.value == 'HR' || roleName.value == 'USER') {
    window.location.reload();
  }
};

const btnDeleteClick = () => {
  UserIsDeleted = true;
  DocumentIsDeleted.value = true;
};

const btnRecordListClick = () => {
  if(recordListModal.value) {
    recordListModal.value.style.display = "block";
  }
};

const btnCloseClick = () => {
  if(recordListModal.value && roleRecordModal.value && roleDeleteModal.value && countryRecordModal.value && countryDeleteModal.value && cityRecordModal.value && cityDeleteModal.value && districtRecordModal.value && districtDeleteModal.value) {
    recordListModal.value.style.display = "none";
    roleRecordModal.value.style.display = "none";
    roleDeleteModal.value.style.display = "none";
    countryRecordModal.value.style.display = "none";
    countryDeleteModal.value.style.display = "none";
    cityRecordModal.value.style.display = "none";
    cityDeleteModal.value.style.display = "none";
    districtRecordModal.value.style.display = "none";
    districtDeleteModal.value.style.display = "none";
  }
};

const btnResetClick = () => {
  window.location.reload();
};

const militaryStatusChange = () => {
  const postponementDate = document.getElementById('postponementDate');
  const lblPostponementDate = document.getElementById('lblPostponementDate');

  if(postponementDate && lblPostponementDate) {
    if (militaryStatus.value?.value === 'P') {
      postponementDate.style.display = 'block';
      lblPostponementDate.style.display = 'block';
    } else {
      postponementDate.style.display = 'none';
      lblPostponementDate.style.display = 'none';
    }
  }
}

const recordListRowClick = (id: number, firstName: string, lastName: string, userName: string, email: string, password: string, roleId: string, createdAt: string, updatedAt: string, tckn: string,
                            motherName: string, fatherName: string, birthDate: string, gender: string, civilStatus: string, employmentDate: string, militaryStatus: string,
                            postponementDate: string, countryId: string, CountryName: string, cityId: string, CityName: string, districtId: string, DistrictName: string, address: string, ImagePath: string) => {
  debugger;
  UserId.value = id;
  FirstName.value = firstName;
  LastName.value = lastName;
  UserName.value = userName;
  Email.value = email;
  Password.value = password;
  UserCreatedAt.value = createdAt;
  UserUpdatedAt.value = updatedAt;
  selectedRole.value = roleId;
  SerialNumber.value = tckn;
  MotherName.value = motherName;
  FatherName.value = fatherName;
  let dateParts = birthDate.split(' ')[0].split('.');
  BirthDate.value = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString().split('T')[0];
  Gender.value = gender === 'Erkek' ? 'E' : 'K';
  CivilStatus.value = civilStatus;
  dateParts = employmentDate.split(' ')[0].split('.');
  EmploymentDate.value = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString().split('T')[0];
  MilitaryStatus.value = militaryStatus === 'Tamamlamış' ? 'C' : militaryStatus == 'Tecilli' ? 'P' : militaryStatus == 'Muaf' ? 'E' : '';

  if(postponementDate !== null) {
    dateParts = postponementDate.split(' ')[0].split('.');
    PostponementDate.value = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString().split('T')[0];
    document.getElementById("lblPostponementDate")!.style.display = "block";
    document.getElementById("postponementDate")!.style.display = "block";
  }

  else {
    PostponementDate.value = "";
    document.getElementById("lblPostponementDate")!.style.display = "none";
    document.getElementById("postponementDate")!.style.display = "none";
  }

  if(countryName.value && cityName.value && districtName.value && addressText.value && uploadPreview.value && recordListModal.value) {
    CountryId.value = countryId;
    countryName.value.value = CountryName;
    CityId.value = cityId;
    cityName.value.value = CityName;
    DistrictId.value = districtId;
    districtName.value.value = DistrictName;
    Address.value = address;
    uploadPreview.value.innerHTML = `<img src="${ImagePath}" alt="">`;
    ImageFilePath.value = ImagePath;
    recordListModal.value.style.display = "none";
  }
};

const imageUploadChange = () => {
  const file = imageUpload.value!.files![0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      if(uploadPreview.value) {
        uploadPreview.value.innerHTML = `<img src="${e.target!.result}" alt="Uploaded Image">`;
      }
    };

    reader.readAsDataURL(file);
    ImageFilePath.value = "/assets/img/" + file.name;
    selectedFile.value = file;
  }
}

const documentRecordListRowClick = (
  id: number,
  name: string,
  filePath: string,
  status: string,
  createdAt: string,
  updatedAt: string
) => {
  debugger;
  DocumentId.value = id;
  DocumentName.value = name;
  FilePath.value = filePath;
  txtState.value = status;
  txtCreatedDate.value = createdAt;
  txtUpdatedDate.value = updatedAt;

  if(recordListModal.value){
    recordListModal.value.style.display = "none";
  }
};

const btnLoadDocumentClick = () => {
  if (divLoadDocument.value && divProfile.value) {
    divLoadDocument.value.style.display = "block";
    divProfile.value.style.display = "none";
  }
};

const btnDocumentApproveClick = () => {
  if (divDocumentApprove.value && divProfile.value) {
    divDocumentApprove.value.style.display = "block";
    divProfile.value.style.display = "none";
  }
}

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
    formData.append("directoryName", 'documents');

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
  debugger;

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
    infoMessage.value = `Evrak ${isApprove ? "onay" : "red"
      } işlemi sırasında bir hata oluştu`;

    if(infoModal.value){
      infoModal.value.style.display = "block";
    }
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

    if(infoModal.value){
      infoModal.value.style.display = "block";
    }
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
  debugger;
  if (res.data.message != null) {
    infoMessageTitle.value = "Hata";
    infoMessage.value = res.data.message;
  } else {
    infoMessageTitle.value = "Bilgi";
    infoMessage.value = "Kayıt işlemi başarıyla yapıldı!";
  }
};

const SendNotification = async (isApprove: boolean) => {
  debugger;
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
