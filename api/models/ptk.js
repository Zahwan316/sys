const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Ptk =  Sequelize.define('ptk', {
    ptk_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    jenis_kelamin: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    tempat_lahir: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    agama_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'agama',
        key: 'agama_id'
      }
    },
    nik: {
      type: DataTypes.CHAR(16),
      allowNull: true
    },
    nip: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    no_kk: {
      type: DataTypes.CHAR(16),
      allowNull: true
    },
    nuptk: {
      type: DataTypes.CHAR(16),
      allowNull: true
    },
    nuks: {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    karpeg: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    karpas: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    status_kepegawaian_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    jenis_ptk_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    no_telepon_rumah: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    no_hp: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    status_keaktifan_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sk_cpns: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    tgl_cpns: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    sk_pengangkatan: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    tmt_pengangkatan: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    lembaga_pengangkat_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pangkat_golongan_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    keahlian_laboratorium_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    sumber_gaji_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    nama_ibu_kandung: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status_perkawinan: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tmt_pns: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    sudah_lisensi_kepala_sekolah: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pernah_diklat_kepengawasan: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    nm_wp: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mampu_handle_kk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    keahlian_braille: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    keahlian_bhs_isyarat: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    npwp: {
      type: DataTypes.CHAR(15),
      allowNull: true
    },
    kewarganegaraan: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    id_bank: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    rekening_bank: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    rekening_atas_nama: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    soft_delete: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: "1901-01-01 00:00:00"
    },
    updater_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'ptk',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ptk_pkey",
        unique: true,
        fields: [
          { name: "ptk_id" },
        ]
      },
    ]
  });

module.exports = Ptk
