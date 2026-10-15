package com.example.study_jvm.exception;

class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

public class Account {

    private int balance;

    public Account(int balance){
        this.balance = balance;
    }

    // [1] throw만 있음: unchecked 예외라 throws 선언 안 해도 됨
    public void deposit(int amount){
        if (amount <= 0){
            throw new IllegalArgumentException("입금액은 0보다 커야 함");
        }
        balance += amount;
    }

    // [2] throws + throw 둘 다 : checked 예외를 직적 던지므로 선언 필수
    public void withdraw(int amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("잔액 부족");   // 직접 던짐
        }
        balance -= amount;
    }

    // [3] throws만 있음: 내가 throw한 건 없고, 호출한 withdraw()의 예외를 그냥 위로 넘김
    public void transfer(Account to, int amount) throws InsufficientFundsException {
        withdraw(amount);   // 여기서 터지면 처리 안 하고 호출자에게 전달
        to.deposit(amount);
    }

    public int getBalance() {
        return balance;
    }

    public static void main(String[] args) {
        Account a = new Account(1000);
        Account b = new Account(0);

        // [1] try-catch 없어도 컴파일됨 (실행 시 터질 수는 있음)
        a.deposit(500);

        // [2] checked 예외라서 try-catch가 없으면 컴파일 에러
        try {
            a.withdraw(5000);
        } catch (InsufficientFundsException e) {
            System.out.println("출금 실패: " + e.getMessage());
        }

        // [3] transfer도 throws를 달고 있어서 똑같이 처리해야 함
        try {
            a.transfer(b, 9999);
        } catch (InsufficientFundsException e) {
            System.out.println("이체 실패: " + e.getMessage());
        }

        System.out.println("a 잔액: " + a.getBalance());   // 1500
        System.out.println("b 잔액: " + b.getBalance());   // 0
    }

}
