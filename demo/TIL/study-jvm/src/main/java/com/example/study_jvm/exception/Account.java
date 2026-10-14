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

}
