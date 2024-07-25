import Foundation
import Alamofire

struct OEISJsonResponse<T: Codable>: Codable {
  var results: [T]
}

func search(q: String, onSuccess: @escaping ([Sequence]) -> Void, onFailure: @escaping (Error) -> Void) {
  let parameters = [
    "q": [q],
    "fmt": ["json"],
  ]

  AF.request("https://oeis.org/search", parameters: parameters)
    .validate()
    .validate(contentType: ["application/json"])
    .responseDecodable(of: OEISJsonResponse<Sequence>.self) { response in
      switch response.result {
      case let .success(data):
        onSuccess(data.results)
      case let .failure(error):
        onFailure(error)
      }
    }
  
}
