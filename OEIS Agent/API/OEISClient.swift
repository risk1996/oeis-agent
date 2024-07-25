import Foundation
import Combine
import Alamofire

struct OEISJsonResponse<T: Codable>: Codable {
  var results: [T]
}

func search(q: String) -> Future<OEISJsonResponse<Sequence>, AFError> {
  let parameters = [
    "q": [q],
    "fmt": ["json"],
  ]
  
  return Future<OEISJsonResponse<Sequence>, AFError> { future in
    AF.request("https://oeis.org/search", parameters: parameters)
      .validate()
      .validate(contentType: ["application/json"])
      .responseDecodable(of: OEISJsonResponse<Sequence>.self) { response in
        future(response.result)
      }
  }
}
