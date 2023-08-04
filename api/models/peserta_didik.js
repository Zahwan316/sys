const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('peserta_didik', {
    peserta_didik_id: {
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
      allowNull: true
    },
    golongan_darah: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    kewarganegaraan: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    anak_keberapa: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    jumlah_saudara_kandung: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    alat_transportasi_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    nama_ayah: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "NULL"
    },
    pendidikan_ayah_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    pekerjaan_ayah_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    tanggal_lahir_ayah: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nama_ibu_kandung: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "NULL"
    },
    pendidikan_ibu_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    pekerjaan_ibu_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    tanggal_lahir_ibu: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nama_wali: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "NULL"
    },
    pendidikan_wali_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    pekerjaan_wali_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    tanggal_lahir_wali: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nik: {
      type: DataTypes.CHAR(16),
      allowNull: true
    },
    nisn: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nipd: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    no_kk: {
      type: DataTypes.CHAR(16),
      allowNull: true
    },
    reg_akta_lahir: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    no_kks: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    penerima_kps: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    no_kps: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    penerima_kip: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    layak_pip: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    alasan_layak_pip: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    no_kip: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    nama_di_kip: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    tmt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    npsn_jenjang_sebelumnya: {
      type: DataTypes.STRING(12),
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
    sequelize,
    tableName: 'peserta_didik',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "peserta_didik_pkey",
        unique: true,
        fields: [
          { name: "peserta_didik_id" },
        ]
      },
    ]
  });
};
