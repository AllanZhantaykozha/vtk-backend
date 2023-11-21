-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "firstname" TEXT,
    "secondname" TEXT,
    "surname" TEXT,
    "group" TEXT,
    "description" TEXT,
    "jobName" TEXT,
    "password" TEXT NOT NULL,
    "cellNumber" TEXT[],
    "photos" TEXT[],
    "profilePhoto" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "photos" TEXT[],
    "content" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_login_key" ON "Teacher"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_group_key" ON "Teacher"("group");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
