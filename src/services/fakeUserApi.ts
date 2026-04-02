export type UserFormData = {
  username: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  education: string;
  skills: string[];
  workDate: unknown;
  intro: string;
  agreement: boolean;
};


export function submitUserForm(
  data: UserFormData
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.2;

      if (shouldFail) {
        reject(new Error("模拟接口异常，请稍后重试"));
      } else {
        console.log("模拟发送到后端的数据：", data);
        resolve({
          success: true,
          message: "提交成功",
        });
      }
    }, 1000);
  });
}