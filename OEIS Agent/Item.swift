//
//  Item.swift
//  OEIS Agent
//
//  Created by William Darian on 2024/07/25.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
