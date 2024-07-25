import Foundation
import Alamofire

struct OEISJsonResponse<T: Codable>: Codable {
  var results: [T]
}

func search(q: String) async throws -> OEISJsonResponse<Sequence> {
  let parameters = [
    "q": [q],
    "fmt": ["json"],
  ]
  
  return try await withCheckedThrowingContinuation { continuation in
    AF.request("https://oeis.org/search", parameters: parameters)
      .validate()
      .validate(contentType: ["application/json"])
      .responseDecodable(of: OEISJsonResponse<Sequence>.self) { response in
        continuation.resume(with: response.result)
      }
  }
}
