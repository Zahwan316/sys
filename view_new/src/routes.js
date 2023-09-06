import React from 'react'
import ProgramPage from './page/kurikulum/programpage'
import RombelPage from './components/formmain_kurikulum/program/rombel'
import TugasMain from './page/kurikulum/tugas'
import RombelMain from './page/kurikulum/rombelpage'
import JadwalMain from './page/kurikulum/jadwalpage'
import MutasiSemesterMain from './page/mutasi/mustasisemester'
import MutasiRombelMain from './page/mutasi/mutasirombel'
import MutasiSiswaMain from './page/mutasi/mutasisiswa'
import MapelPage from './page/kurikulum/mapel'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

//form
const FormSekolahPage = React.lazy(() => import('./page/formSekolah'))
const KurikulumPage = React.lazy(() => import("./page/kurikulum/kurikulum"))
const PosPembayaran = React.lazy(() => import("./page/pembayaran/pospembayaran"))
const SkPenetapan = React.lazy(() => import("./page/pembayaran/skpenetapan"))

//peserta didik
const PesertaDidikPage = React.lazy(() =>  import("./page/peserta_didik/peserda_didik_page"))
const PesertaDidikDataPage = React.lazy(() => import("./page/peserta_didik/peserta_didik_data"))

//ptk
const PtkPage = React.lazy(() => import("./page/ptk/ptkmain"))
const PtkUploadPage = React.lazy(() => import("./page/ptk/ptkupload"))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  //forms sekolah
  { path: '/tambahsekolah', name: 'Pengelolaan / Kelembagaan', element: FormSekolahPage },

  //kurikulum
  { path: '/kurikulum', name: 'Pengelolaan / Kurikulum', element: KurikulumPage },
  { path: '/program', name: 'Pengelolaan / Kurikulum / Program', element: ProgramPage },
  { path: '/rombel', name: 'Pengelolaan / Kurikulum / Rombel', element: RombelMain, },
  { path: '/tugasmengajar', name: 'Pengelolaan / Kurikulum / Tugas Mengajar', element: TugasMain },
  { path: '/jadwal', name: 'Pengelolaan / Kurikulum / Jadwal', element: JadwalMain },
  { path: '/jadwal/:type/:id', name: 'Pengelolaan / Kurikulum / Jadwal', element: JadwalMain },
  { path: '/mapel', name: 'Pengelolaan / Kurikulum / Mata Pelajaran', element: MapelPage },
  
  
  //mutasi
  { path: '/mutasisemester', name: 'Pengelolaan / Mutasi / Semester', element: MutasiSemesterMain },
  { path: '/mutasirombel', name: 'Pengelolaan / Mutasi / Rombel', element: MutasiRombelMain },
  { path: '/mutasisiswa', name: 'Pengelolaan / Mutasi / Siswa', element: MutasiSiswaMain    },
  
  //keuangan
  { path: '/pospembayaran', name: 'Pengelolaan / Pembayaran / Pos Pembayaran', element: PosPembayaran    },
  { path: '/skpenetapan', name: 'Pengelolaan / Pembayaran / Sk Penetapan', element: SkPenetapan    },
  
  //Peserta Didik
  { path: '/pesertadidik', name: 'Pengelolaan / Peserta Didik / Upload Peserta', element: PesertaDidikPage    },
  { path: '/datapesertadidik', name: 'Pengelolaan / Peserta Didik / Data Peserta Didik', element: PesertaDidikDataPage    },
  { path: '/datapesertadidik/:id', name: 'Pengelolaan / Peserta Didik / Data Peserta Didik', element: PesertaDidikDataPage    },
  
  //ptk
  { path: '/dataptk', name: 'Pengelolaan / Ptk / Data Ptk', element: PtkPage},
  { path: '/dataptk/:id', name: 'Pengelolaan / Ptk / Data Ptk', element: PtkPage},
  { path: '/uploadptk', name: 'Pengelolaan / Ptk / Upload Ptk', element: PtkUploadPage},

  
]

export default routes
