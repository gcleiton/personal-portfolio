export class Result<Model = any> {
  private readonly _isSuccess: boolean
  private readonly _isFailure: boolean
  private readonly _error?: Error
  private readonly _value?: Model

  private constructor(isSuccess: boolean, error?: Error, value?: Model) {
    this._isSuccess = isSuccess
    this._isFailure = !isSuccess
    this._error = error
    this._value = value
  }

  static failure<Model>(error: Error): Result<Model> {
    return new Result(false, error)
  }

  static done<Model>(value?: Model): Result<Model> {
    return new Result(true, undefined, value)
  }

  get isSuccess(): boolean {
    return this._isSuccess
  }

  get isFailure(): boolean {
    return this._isFailure
  }

  get error(): Error | undefined {
    return this._error
  }

  get value(): Model | undefined {
    return this._value
  }
}
