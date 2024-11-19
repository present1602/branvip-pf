import { db } from "@/utils/db";
import { ApplicantType, Prisma, UserApplicant } from "@prisma/client";
import { kiprisService } from "./kipris.service";

interface ICreateMyBoardWithImagesDto {
  userId: string;
  title: string;
  content: string;
  files: {
    fileName: string;
    fileSize: string;
    imageUrl: string;
    previewImage: string;
  }[];
}

interface IUpdateUserBoardComment {
  id: string;
  content: string;
}
class UserService {
  async getUserByEmail(email: string) {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        accounts: true
      }

    });
    return user;
  }

  async createUserWithSocialLoginType(data: Prisma.UserCreateInput) {
    const user = await db.user.create({ data });
    return user;
  }

  async createAccount(data: Prisma.AccountCreateInput) {
    const user = await db.account.create({ data });
    return user;
  }

  async getSocialUserByProviderId(provider: string, providerAccountId: string) {
    const account = await db.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: provider,
          providerAccountId: providerAccountId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    return account;
  }

  async getUserProfile(id: string) {
    const user = await db.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        email: true,
        loginType: true,
        accounts: {
          select: {
            id: true,
            provider: true,
            providerAccountId: true,
            socialEmail: true,
            access_token: true,
          },
        },
      },
    });
    return user;
  }

  // memo: 함수명은 getUserProfile인데 applicant까지 다 가져와서 이상함
  async getUserProfileOrThrow(id: string) {
    const user = await db.user.findUniqueOrThrow({
      where: { id },
      include: {
        applicant: {
          include: {
            _count: {
              select: { trademarks: true },
            },
          },
        },
        _count: {
          select: {
            boards: true,
            orders: true,
          },
        },
      },
    });

    return user;
  }

  async updateUser(dto: Prisma.UserUpdateInput, id: string) {
    return await db.user.update({
      where: { id },
      data: { ...dto, updatedAt: new Date() },
    });
  }

  /* 사용안하는데 나중에 이메일 회원을 소셜로그인 회원으로 변경하는 기능 달아달라면 쓸 수도 있음 */
  async updateUserLoginTypeByEmail(provider: string, email: string) {
    return await db.user.update({
      where: { email },
      data: { loginType: provider },
    });
  }

  async getBoardCountByUser(userId: string) {
    const count = await db.userBoard.count({
      where: { userId },
    });
    return count;
  }

  async updateLastLoggedIn(id: string) {
    const count = await db.user.update({
      where: { id },
      data: {
        lastLoggedIn: new Date()
      }
    });
    return count;
  }

  async getApplicantById(id: string) {
    const applicant = await db.userApplicant.findUnique({
      where: { id },
    });
    return applicant;
  }

  async getApplicantByIdAndUserId(id: string, userId: string) {
    // console.log("getApplicantByIdAndUserId id : " + id + ", usrId: ", userId)
    const applicant = await db.userApplicant.findFirst({
      where: {
        AND: [{ id: id }, { userId: userId }],
      },
    });
    return applicant;
  }

  async getApplicantsByType(type: ApplicantType, userId: string) {
    // console.log("getApplicantByIdAndUserId id : " + id + ", usrId: ", userId)
    const applicant = await db.userApplicant.findMany({
      where: {
        AND: [{ type: type }, { userId: userId }],
      },
      orderBy: {
        createdAt: "desc" as Prisma.SortOrder,
      },
    });
    return applicant;
  }

  async getApplicantsByUserId(userId: string) {
    console.log("get userId : ", userId);
    const applicant = await db.userApplicant.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc" as Prisma.SortOrder,
      },
    });

    return applicant;
  }

  async updateLoginType(loginType: string, id: string) {
    const user = await db.user.update({
      where: {
        id: id,
      },
      data: {
        loginType: loginType,
      },
    });
    return user;
  }

  async getVerifiedApplicantsByUserID(userId: string) {
    const applicant: UserApplicant[] = await db.userApplicant.findMany({
      where: {
        userId,
        isVerification: true,
      },
    });

    return applicant;
  }

  async createApplicant(data: {
    name: string;
    email: string;
    phoneNumber: string;
    userId: string;
  }) {
    const app = data;
    const applicant = await db.userApplicant.create({
      data: {
        userId: app.userId,
        name: app.name,
        email: app.email,
        phoneNumber: app.phoneNumber,
      },
    });
    return applicant;
  }

  async getBoardsByUserId(
    userId: string,
    page: number = 1,
    rowsPerPage: number = 5
  ) {
    const boards = await db.userBoard.findMany({
      where: { userId },
      include: {
        _count: {
          select: { comments: true },
        },
      },
      orderBy: {
        createdAt: "desc" as Prisma.SortOrder,
      },
      skip: (page - 1) * rowsPerPage, // 페이지 네이션을 위해 건너뛸 레코드 수
      take: rowsPerPage,
    });

    return boards;
  }

  async getBoardByIdOrThrow(id: string, userId: string) {
    const board = await db.userBoard.findFirstOrThrow({
      where: { id, userId },
      include: {
        comments: {
          where: {
            isDeleted: false,
          },
          orderBy: {
            createdAt: "desc" as Prisma.SortOrder,
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return board;
  }

  async getMyTrademarks(userId: string) {
    const applicant = await db.userApplicant.findMany({
      where: {
        userId,
        isVerification: true
      },
    });

    if (applicant.length === 0)
      return {
        applicantNumber: "",
        trademarks: [],
        total: 0,
      };

    let trademarks = await kiprisService.getTrademarkesBySearch({
      // keyword: applicant[0].applicantNumber,
      keyword: "420070496201",
      offset: 0,
      limit: 50,
    });


    // return { ...trademarks, applicantNumber: applicant[0].applicantNumber };
    return { ...trademarks };
  }
  async createMyBoard(dto: Prisma.UserBoardCreateInput) {
    const board = await db.userBoard.create({
      data: dto,
    });

    return board;
  }

  async createMyBoardWithImages({
    userId,
    title,
    content,
    files,
  }: ICreateMyBoardWithImagesDto) {
    let newBoard;

    try {
      await db.$transaction(async (prisma) => {
        newBoard = await prisma.userBoard.create({
          data: {
            title,
            content,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        const boardId = newBoard.id;

        // Save board images
        await Promise.all(
          files.map((file) => {
            return prisma.userBoardMedia.create({
              data: {
                userBoardId: boardId,
                imageUrl: file.imageUrl,
                fileName: file.fileName,
              },
            });
          })
        );
      });
    } catch (error) {
      console.log(error)
    }

    return newBoard;
  }

  async createMyBoardComment(dto: Prisma.UserBoardCommentCreateInput) {
    const comment = await db.userBoardComment.create({
      data: dto,
    });

    return comment;
  }

  async createMyApplicant(
    userId: string,
    dto: Prisma.UserApplicantCreateWithoutUserInput
  ) {
    const applicant = await db.userApplicant.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return applicant;
  }

  async updateMyApplicant(id: string, dto: Prisma.UserApplicantUpdateInput) {
    const applicant = await db.userApplicant.update({
      where: { id },
      data: dto,
    });

    return applicant;
  }

  /* 댓글 유저가 삭제해도 관리자에서 볼 수 있게 해야되면 사용 */
  async deleteUserBoardComment(id: string, userId: string) {
    const result = await db.userBoardComment.update({
      where: {
        id,
        userId,
      },
      data: { isDeleted: true },
    });
  }

  async deleteLogoScrap(id: number, userId: string) {
    const result = await db.logoScrap.delete({
      where: {
        id,
        userId,
      },
    });

    console.log(result);
  }

  async deleteUser(id: string) {
    return await db.user.delete({
      where: { id },
    });
  }

  async updateUserBoardComment(data: IUpdateUserBoardComment, userId: string) {
    const comment = await db.userBoardComment.findFirst({
      where: {
        id: data.id,
        userId: userId,
      },
    });

    if (!comment) {
      throw new Error(
        "Comment not found or user does not have permission to update."
      );
    }

    const result = await db.userBoardComment.update({
      where: {
        id: data.id,
      },
      data: {
        content: data.content,
      },
    });
  }
}

export const userService = new UserService();
