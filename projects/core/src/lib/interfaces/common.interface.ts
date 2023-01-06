export interface socialUserDetail{
    id:any,
    name:string,
    email:string,
    picture:{
        data:{
            url:string
        }
    }
}

export interface customerDataDetails{
    Status: any,
    ErrorCode: any,
    Message: any,
    MessageType: any,
    FirstName: any,
    MiddleName: any,
    LastName: any,
    DateOfBirth: any,
    Address1 :any,
    Address2 :any,
    Address3 :any,
    EmailId: any,
    MobileNo: any,
    CityGuId: any,
    StateGuId: any,
    Pincode: any,
}


export interface nomineeProfileDetail{
    Status: any,
    ErrorCode: any,
    Message: any,
    MessageType: any,
    IsInterestedInNominee: any,
    FirstName: any,
    MiddleName: any,
    LastName: any,
    Gender: any,
    RelationWithNominee: any,
    DateOfBirth: any,
    PercentageAllocation: any,
    PanAadharNumber: any,
    IsNomineeMinor: any,
    Address :any,
    EmailId: any,
    MobileNo: any,
    NoOfNominee: any,
    GFullName: any,
    GPanAadharNumber: any,
    GAddress: any,
    GCityGuId: any,
    GStateGuId: any,
    Pincode: any,
    Country: any
}

export interface userProfileDetail{
    Status: any,
    ErrorCode: any,
    Message: any,
    MessageType: any,
    SocialClientId: any,
    firstName: any,
    middleName: any,
    lastName: any,
    Gender: any,
    DateOfBirth: any,
    emailId: any,
    MobileNo: any,
    contactDetails:any;
    AddressLine1: any,
    AddressLine2: any,
    AddressLine3: any,
    Pincode: any,
    City: any,
    State: any,
    Country: any,
    AddressType: any
}

export interface registrationResponse{
    Status:any,
    ErrorCode:any,
    Message:any,
    MessageType:any,
    Key:any,
    Token:any,
    CustGuId:any
}

export interface otpResponse{
    Status:any,
    ErrorCode:any,
    Message:any,
    MessageType:any,
    Key:any,
    Token:any
}

export interface panDetails{

    Status:any,
    ErrorCode:any,
    Message:any,
    MessageType:any,
    tsTransId:any,
    msg:{
        PanNumber:any,
        source_id:any,
        Name:any,
        lastUpdate:any,
        NameOnTheCard:any,
        status:any,
        statusDescription:any,
        gender:any,
        state:any,
        mobile:any,
        tsTransId:any,
        secretToken:any,
        captchaCode:any
    }
}

export interface civilKraDetails{
    Status: any,
    ErrorCode: any,
    MessageType: any,
    Data: {
        PanNumber: any,
        PanName: any,
        Status: any,
        StatusDt: any,
        EntryDt: any,
        ModDt: any,
        StatusDelta: any,
        UpdateStatus: any,
        HoldDeactiveRmks: any,
        UpdateRmks: any,
        KycMode: any,
        IpvFlag: any,
        UboFlag: any,
        BatchId: any,
        ResponseData: any,
        TotalRecord: any
    },
    Message: any
}

export interface offerList{
    Status: any,
    ErrorCode: any,
    MessageType: any,
    Message: any,
    OfferList: [
        {
            OfferingGuId: any,
            Offering: any
        },
        {
            OfferingGuId: any,
            Offering: any
        },
        {
            OfferingGuId: any,
            Offering: any
        },
        {
            OfferingGuId: any,
            Offering: any
        },
        {
            OfferingGuId: any,
            Offering: any
        },
        {
            OfferingGuId: any,
            Offering: any
        },
        {
            OfferingGuId: any,
            Offering: any
        }
    ]
}

export interface stepperData{
    Status: any,
    ErrorCode: any,
    MessageType: any,
    Message: any,
    DocumentList: any,
    CustomerPanName: any,
    IsKra: any
}

export interface bankDetails{
    Status:any,
    ErrorCode:any,
    Message:any,
    MessageType:any,
    msg:{
        'Bank Account Number':any,
        'IFSC Code':any,
        'Account Holder Name':any,
        'Bank Name':any,
        'Bank Branch - Address':{
            Branch:any,
            Address:any,
            gender:any,
            State:any,
            City:any,
            District:any,
            Contact:any
        },

    }

}

export interface dropdown {
  value: string;
  viewValue: string;
}

export interface master{
  ID:string;
  TEXT:string
}

export interface ExchangeSelectionDataListRe{
    Status: any,
    ErrorCode: any,
    MessageType: any,
    Message: any,
    ExchangeSelectionDataList: [
        {
            ExchangeSelectionGuId:any,
            Exchange:any,
            Description:any,
            IsChecked: any,
            CustGuId:any,
            MFGuid:any,
            EquityGuid:any,
            DerivativeGuid:any
        }
       
    ]
}

export interface ChequeOcrResponse{
    "Status": any,
    "msg": {
        "Cheque": {
            "ifsc": {
                "Value": any,
                "Validated": any
            },
            "micr": {
                "Value": any,
                "Validated": any
            },
            "bank": {
                "Value": any,
                "Validated": any
            },
            "payor": {
                "Value": any,
                "Validated": any
            },
            "acc_num": {
                "Value": any,
                "Validated": any
            },
            "account_id": {
                "Value": any,
                "Validated": any
            },
            "cheque_number": {
                "Value": any,
                "Validated": any
            }
        }
    },
    "Message": any,
    "ErrorCode": any,
    "MessageType": any
}



