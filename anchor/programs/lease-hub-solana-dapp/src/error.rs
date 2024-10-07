use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid time range")]
    InvalidTimeRange,

    #[msg("Invalid payment amount")]
    InvalidPaymentAmount,

    #[msg("Insufficient SOL staked")]
    InsufficientStake,

    #[msg("Invalid input update parameter")]
    InvalidInputUpdateParam,

    #[msg("The order has already been paid")]
    OrderAlreadyPaid,


    #[msg("Insufficient tokens")]
    InsufficientBalance,

    #[msg("Insufficient share token balance")]
    InsufficientSwapSolBalance,

    #[msg("Insufficient tokens")]   
    InsufficientTokens,

    #[msg("Calculation error")]
    CalculationError,

    #[msg("Insufficient SOL")]
    InsufficientSol,


    #[msg("Unauthorized finish")]
    UnauthorizedFinish,


    #[msg("Invalid order status")]
    InvalidOrderStatus,

    #[msg("Unauthorized cancellation")]
    UnauthorizedCancellation,
}

