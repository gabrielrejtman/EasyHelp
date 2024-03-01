-- CreateTable
CREATE TABLE `problemas` (
    `id_problema` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `dificuldade` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_admin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_problema`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supervisores` (
    `matricula_supervisor` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `setor` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `supervisores_matricula_supervisor_key`(`matricula_supervisor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `administrador` (
    `matricula_adm` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `administrador_matricula_adm_key`(`matricula_adm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tecnicos` (
    `matricula_tecnico` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tecnicos_matricula_tecnico_key`(`matricula_tecnico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ocorrencias` (
    `id_ocorrencia` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fim_ocorrencia` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `avaliacao` INTEGER NOT NULL,
    `prioridade` VARCHAR(191) NOT NULL,
    `id_supervisor` VARCHAR(191) NOT NULL,
    `id_prob` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_ocorrencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `problemas` ADD CONSTRAINT `problemas_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `administrador`(`matricula_adm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencias` ADD CONSTRAINT `ocorrencias_id_supervisor_fkey` FOREIGN KEY (`id_supervisor`) REFERENCES `supervisores`(`matricula_supervisor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencias` ADD CONSTRAINT `ocorrencias_id_prob_fkey` FOREIGN KEY (`id_prob`) REFERENCES `problemas`(`id_problema`) ON DELETE RESTRICT ON UPDATE CASCADE;
