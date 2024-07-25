import Foundation
import SwiftData

@Model
final class Sequence: Codable {
  var number: Int
  var data: String
  
  private enum CodingKeys: CodingKey { case number, data }
  
  init(number: Int, data: String) {
    self.number = number
    self.data = data
  }
  
  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    self.number = try container.decode(Int.self, forKey: .number)
    self.data = try container.decode(String.self, forKey: .data)
  }
  
  func encode(to encoder: any Encoder) throws {
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(self.number, forKey: .number)
    try container.encode(self.data, forKey: .data)
  }
}
